import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CentersService } from './core/services';

/**
 * A component for the AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _cs: CentersService) { }

  get active(): Observable<any> {
    return this._cs.active;
  }
}
