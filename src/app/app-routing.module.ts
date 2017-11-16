import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterGuard } from './core/guards';

const routes: Routes = [{
  path: '',
  loadChildren: 'app/home/home.module#HomeModule'
}, {
  path: 'center',
  loadChildren: 'app/center/center.module#CenterModule',
  canActivateChild: [CenterGuard]
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
