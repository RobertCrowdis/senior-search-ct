import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SERVICES, LocationService } from './services';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [...SERVICES],
  declarations: []
})
export class CoreModule {
  constructor(private _ls: LocationService) { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}

