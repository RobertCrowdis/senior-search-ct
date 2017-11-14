import { Pipe, PipeTransform } from '@angular/core';
import { Geokit, LatLngLiteral } from 'geokit';
import { Observable } from 'rxjs/Observable';

import { LocationService } from '../../core/services';

/**
 * A class for the DistancePipe
 */
@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {
  constructor (private _ls: LocationService) {}
  /**
   * Calculates the distance in miles between the input and the users location.
   * @param value Target location to get distance from.
   * @param args Set how long you want to go.
   * @returns Observable string.
   */
  transform(value: LatLngLiteral, args: number = 1): Observable<string> {
    return this._ls.coordinates.map((user: LatLngLiteral) => new Geokit().distance(user, value, 'miles').toFixed(args
    ));
  }
}
