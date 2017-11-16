import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from 'geokit';

import { environment } from '../../../environments/environment';

/**
 * A class for the CentersService
 */
@Injectable()
export class CentersService {
  private _about: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _active: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _default: any = {
    agency: 'Senior Search CT',
    coordinates: {
      lat: 41.6032,
      lng: -73.0877
    }
  };
  private _events: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _sneakers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
    * @param _fbDB Firebase Database instance.
    * @param _http HttpClient is available as an injectable class, with methods to perform HTTP requests.
    */
  constructor(private _fbDB: AngularFireDatabase, private _http: HttpClient) {
    this._active.next(this._default);
  }

  get about(): Observable<any> {
    return this._about.asObservable();
  }

  get active(): Observable<any> {
    return this._active.asObservable();
  }

  get events(): Observable<any[]> {
    return this._events.asObservable();
  }

  get sneakers(): Observable<any[]> {
    return this._sneakers.asObservable();
  }

  /**
   * Queries all senior centers in the state.
   * @returns Observable array of senior centers.
   */
  public findAll(): Observable<any[]> {
    return this._fbDB.list('centers').snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }))
        .filter(c => (c.agency && c.address.city));
    });
  }

  /**
   * Searches the database for an agency with a matching name
   * @param agency Agency name.
   * @returns Observable object of an agency.
   */
  public findOne(agency: string): Observable<any> {
    return this._fbDB.list('centers', ref => {
      return ref.orderByChild('agency').equalTo(agency).limitToFirst(1);
    }).snapshotChanges().map((changes: any[]) => {
      if (changes.length === 0) { return this._active.next(this._default); }
      const place = { $key: changes[0].payload.key, ...changes[0].payload.val() };
      this._fetchEvents(place.coordinates);
      this._fetchSneakers(place.coordinates);
      (place.place_id) ? this._fetchAbout(place.place_id) : this._about.next({});
      this._active.next(place);
      return place;
    });
  }

  /**
   * Updates about information from Google Maps places API.
   * @param placeid Google maps placeid.
   */
  private _fetchAbout(placeid: string): void {
    const url = environment.api + 'about?placeid=' + placeid;
    this._http.get(url).first().subscribe((response: any) => {
      this._about.next(response.result);
    });
  }

  /**
   * Updates events information near a location.
   * @param coordinates LatLngLiteral of place to find events near.
   */
  private _fetchEvents(coordinates: LatLngLiteral): void {
    const url = 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False' +
      '&photo-host=public&page=20&radius=5.0&desc=False&status=upcoming&sig_id=177136722&sig=e416ba5c105b2aabf6723172c214629d863b0e93' +
      '&topic=wellness,outdoors,parents,social&lat=' + coordinates.lat + '&lon=' + coordinates.lng;
    this._http.jsonp(url, 'callback').first().subscribe((response: any) => {
      this._events.next(response.results);
    });
  }

  /**
   * Updates sneakers information with silver sneakers facilities near a location.
   * @param coordinates LatLngLiteral of place to find silver sneakers facilities near.
   */
  private _fetchSneakers(coordinates: LatLngLiteral): void {
    const url = 'https://locationsearch.tivityhealth.com/api/GeneralLocationsClassesByGeoPoint?' +
      'ProductCode=101&APIKey=54654D75-3AEB-4C5A-80CC-53DA5F71EA18&CallerSystemName=SilverSneakersWebsite&' +
      'MileRadius=5&Latitude=' + coordinates.lat + '&Longitude=' + coordinates.lng;
    this._http.get(url).first().subscribe((response: any) => {
      this._sneakers.next(response.locations);
    });
  }
}
