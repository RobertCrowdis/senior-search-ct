import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CentersService } from '../services';

/**
 * A class for the CenterGuard
 */
@Injectable()
export class CenterGuard implements CanActivate {
  /**
   * @param _cs CentersService that provides information on if a senior center exists in Firebase.
   * @param _router Provides the navigation and url manipulation capabilities.
   */
  constructor(private _cs: CentersService, private _router: Router) { }

  /**
   * Checks if place exists, if it does allow user to visit, otherwise redirect.
   * @param next Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
   * @param state Represents the state of the router at a moment in time.
   * @returns Boolean if user can navigate to a route. Will redirect if user may not visit.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._cs.findOne(decodeURI(next.params.facility))
      .map((place: any) => {
        if (!place) {
          this._router.navigate(['/']);
          return false;
        }
        return true;
      })
      .catch((error: any) => {
        this._router.navigate(['/']);
        return Observable.of(false);
      });
  }

  /**
   * Determine if user can visit child route by passing to canActivate function.
   * @param next Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
   * @param state Represents the state of the router at a moment in time.
   * @returns Boolean if user can navigate to a route. Will redirect if user may not visit.
   */
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
