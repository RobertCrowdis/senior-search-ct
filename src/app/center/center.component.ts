import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LatLngLiteral } from 'geokit';

import { CentersService, LocationService } from '../core/services';

/**
 * A class for the CenterComponent
 */
@Component({
  moduleId: module.id,
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit, OnDestroy {
  private _facility: Observable<any>;
  private _facilitySubscription: Subscription;

  /**
   * @param _cs CentersService that queries all senior centers in the state.
   * @param _location Location is a service that applications can use to interact with a browser's URL.
   * @param _ls LocationService to keep track of user's location.
   * @param _route Contains the information about a route associated with a component loaded in an outlet.
   */
  constructor(private _cs: CentersService, private _location: Location, private _ls: LocationService, private _route: ActivatedRoute) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Subscribes to route to see if facility exists, if not does nothing, otherwise gets profile of facility.
   */
  ngOnInit() {
    this._facilitySubscription = this._route.params.subscribe(params => {
      const facility = params['facility'];
      if (facility) {
        this._facility = this._cs.findOne(decodeURI(facility));
      } else {
        this._facility = null;
      }
    });
  }

  /**
    * Lifecycle hook that is called when a directive, pipe or service is destroyed.
    * Kills subscription to route params.
    */
  ngOnDestroy() {
    this._facilitySubscription.unsubscribe();
  }

  /**
   * Get function for information from Google Maps Places API about an agency.
   * @returns Information from Google Maps Places API about an agency.
   */
  get about(): Observable<any> {
    return this._cs.about;
  }

  /**
   * Get function for LatLngLiteral of user's location.
   * @returns Observable of user's location as LatLngLiteral.
   */
  get coordsUser(): Observable<LatLngLiteral> {
    return this._ls.coordinates;
  }

  /**
   * Get function for all events near an agency.
   * @returns Upcoming events.
   */
  get events(): Observable<any[]> {
    return this._cs.events;
  }

  /**
   * Get function for an agency.
   * @returns Agency/facility informtation.
   */
  get facility(): Observable<any> {
    return this._facility;
  }

  /**
   * Get function for an silver sneakers.
   * @returns Silver sneakers informtation.
   */
  get sneakers(): Observable<any[]> {
    return this._cs.sneakers;
  }

  /**
   * Get function for restaurants from Yelp.
   * @returns Restaurants from Yelp.
   */
  get yelp(): Observable<any[]> {
    return this._cs.yelp;
  }

  /**
   * Takes a string and encodes it as a valid URI.
   * @param uri String to encode.
   * @returns Encoded string.
   */
  public encodeURI(uri: string): string {
    return encodeURI(uri);
  }

  /**
   * Navigates back in the platform's history.
   */
  public goBack(): void {
    this._location.back();
  }

  /**
   * Open new tab to url.
   * @param url Url string.
   */
  public goTo(url: string): void {
    if (!url.match(/^[a-zA-Z]+:\/\//)) { url = 'http://' + url; }
    window.open(url, '_blank');
  }

  /**
   * @TODO Open modal for information passed in.
   * @param type Type of object.
   * @param info Info of object.
   */
  public openModal(type: string, info: any): void {
    console.log(info);
  }
}
