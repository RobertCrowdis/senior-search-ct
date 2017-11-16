import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as Fuse from 'fuse.js';
import 'rxjs/add/operator/first';

import { CentersService } from '../../core/services';

/**
 * A class for the SearchComponent
 */
@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private _centersDisplay: any[];
  private _centersOriginal: any[] = [];
  private _display: boolean;
  private _routeSub: Subscription;
  @ViewChild('searchBar') searchBar: ElementRef;

  /**
   * @param _cs CentersService that queries all senior centers in the state.
   * @param _route Contains the information about a route associated with a component loaded in an outlet.
   */
  constructor(private _cs: CentersService, private _route: ActivatedRoute) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Grabs all senior centers and sets data for search.
   * Subscribes to route to see if changes, clear search on route change.
   */
  ngOnInit() {
    this._cs.findAll().first().subscribe((centers: any[]) => {
      this._centersDisplay = centers;
      this._centersOriginal = centers;
    });

    this._routeSub = this._route.params.subscribe(params => {
      this.searchBar.nativeElement.value = '';
      this.search('');
    });
  }

  /**
    * Lifecycle hook that is called when a directive, pipe or service is destroyed.
    * Kills subscription to route params.
    */
  ngOnDestroy() {
    this._routeSub.unsubscribe();
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
   * Takes a string and encodes it as a valid URI.
   * @param uri String to encode.
   * @returns Encoded string.
   */
  public encodeURI(uri: string): string {
    return encodeURI(uri);
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
