import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LatLngLiteral } from 'geokit';
import * as Fuse from 'fuse.js';
import 'rxjs/add/operator/first';

import { CentersService, LocationService } from '../core/services';

/**
 * A class for the HomeComponent
 */
@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _centersDisplay: any[];
  private _centersOriginal: any[] = [];
  private _display: boolean;
  private _facility: Observable<any>;
  private _facilitySubscription: Subscription;
  @ViewChild('searchBar') searchBar: ElementRef;
  /**
   * @param _cs CentersService that queries all senior centers in the state.
   * @param _ls LocationService to keep track of user's location.
   * @param _route Contains the information about a route associated with a component loaded in an outlet.
   */
  constructor(private _cs: CentersService, private _ls: LocationService, private _route: ActivatedRoute) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Grabs all senior centers and sets data for search.
   * Subscribes to route to see if facility exists, if not does nothing, otherwise gets profile of facility.
   */
  ngOnInit() {
    this._cs.findAll().first().subscribe((centers: any[]) => {
      this._centersDisplay = centers;
      this._centersOriginal = centers;
    });

    this._facilitySubscription = this._route.params.subscribe(params => {
      const facility = params['facility'];
      if (facility) {
        this._facility = this._cs.findOne(decodeURI(facility));
        this._facility.first().subscribe(result => console.log(result));
      } else {
        this._facility = null;
      }
      this.searchBar.nativeElement.value = '';
      this.search('');
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
   * Get function for first 5 centers of a users query.
   * @returns Array of five centers.
   */
  get centers(): any[] {
    return this._centersDisplay.slice(0, 5);
  }

  /**
   * Flag to display list of centers.
   * @returns Flag to display list of centers.
   */
  get display(): boolean {
    return this._display;
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
   * Get function for LatLngLiteral of user's location.
   * @returns Observable of user's location as LatLngLiteral.
   */
  get coordsUser(): Observable<LatLngLiteral> {
    return this._ls.coordinates;
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
   * Open new tab to url.
   * @param url Url string.
   */
  public goTo(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Finds all centers that match users query based on agency name and/or city.
   * @param query User search query.
   */
  public search(query: string): void {
    if (!this._centersOriginal || this._centersOriginal.length < 1) { return; }
    if (!query || query.length === 0) {
      this._centersDisplay = [...this._centersOriginal];
      this._display = false;
      return;
    }
    const searcher = new Fuse(this._centersOriginal, { keys: ['agency', 'address.city'], threshold: 0.4 });
    this._centersDisplay = searcher.search(query);
    this._display = true;
  }
}
