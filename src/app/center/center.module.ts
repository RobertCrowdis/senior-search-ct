import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CenterRoutingModule } from './center-routing.module';
import { CenterComponent } from './center.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    CenterRoutingModule,
    SharedModule
  ],
  declarations: [
    CenterComponent,
    ModalComponent
  ],
  entryComponents: [ModalComponent]
})
export class CenterModule { }
