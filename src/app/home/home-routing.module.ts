import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterGuard } from '../core/guards';

import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: HomeComponent
}, {
  path: ':facility',
  component: HomeComponent,
  canActivate: [CenterGuard]
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
