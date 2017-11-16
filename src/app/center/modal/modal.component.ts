import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LatLngLiteral } from 'geokit';

import { LocationService } from '../../core/services';

/**
 * A class for the ModalComponent
 */
@Component({
  moduleId: module.id,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  private _modalData: any;
  /**
   * @param _dialogRef Reference to a dialog opened via the MatDialog service.
   * @param _data Data passed into modal.
   * @param _ls LocationService to keep track of user's location.
   * @param _router Provides the navigation and url manipulation capabilities.
   * @param _snackBar Service to dispatch Material Design snack bar messages.
   */
  constructor(
    private _dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private _data: any,
    private _ls: LocationService, private _router: Router, private _snackbar: MatSnackBar
  ) {
    switch (this._data.type) {
      case 'sneaker':
        this._processSneaker(this._data.info);
        break;
      case 'restaurant':
        this._processRestaurant(this._data.info);
        break;
      case 'event':
        this._processEvent(this._data.info);
        break;
      default:
        break;
    }
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
  }

  /**
   * Get function for LatLngLiteral of user's location.
   * @returns Observable of user's location as LatLngLiteral.
   */
  get coordsUser(): Observable<LatLngLiteral> {
    return this._ls.coordinates;
  }

  /**
   * Get function for data to display in modal.
   * @returns Processed modal data.
   */
  get data(): any {
    return this._modalData;
  }

  /**
   * Proccesses modal data for events.
   * @param data Event data passed from main page.
   */
  private _processEvent(data: any): void {
    this._modalData = {
      name: data.name,
      details: data.description.replace(/(<([^>]+)>)/ig, ''),
      website: (!data.event_url.match(/^[a-zA-Z]+:\/\//)) ? 'http://' + data.event_url : data.event_url,
      date: data.time
    };
    if (data.venue) {
      this._modalData.coordinates = {
        lat: data.venue.lat,
        lng: data.venue.lng
      };
    }
  }

  /**
   * Proccesses modal data for restaurants.
   * @param data Restaurant data passed from main page.
   */
  private _processRestaurant(data: any): void {
    this._modalData = {
      name: data.name,
      details: data.categories[0].title + ' cuisine at an affordable price (' + data.price + '). ' +
        'Rated ' + data.rating + ' stars by ' + data.review_count + ' people. Located right at ' +
        data.location.display_address.join(', ') + '.',
      website: (!data.url.match(/^[a-zA-Z]+:\/\//)) ? 'http://' + data.url : data.url,
      phone: data.phone,
    };
    if (data.coordinates.latitude && data.coordinates.longitude) {
      this._modalData.coordinates = {
        lat: data.latitude,
        lng: data.longitude
      };
    }
  }

  /**
   * Proccesses modal data for a silver sneakers club.
   * @param data Silver sneakers data passed from main page.
   */
  private _processSneaker(data: any): void {
    this._modalData = {
      name: data.name,
      details: 'SilverSneakers is a program encouraging older adults to participate in physical activities that will ' +
        'help them to maintain greater control of their health.' +
        'It sponsors activities and social events designed to keep seniors healthy while encouraging social interaction.',
      website: (!data.webSiteAddress.match(/^[a-zA-Z]+:\/\//)) ? 'http://' + data.webSiteAddress : data.webSiteAddress,
      phone: data.phone,
    };
    if (data.latitude && data.longitude) {
      this._modalData.coordinates = {
        lat: data.latitude,
        lng: data.longitude
      };
    }
  }
}
