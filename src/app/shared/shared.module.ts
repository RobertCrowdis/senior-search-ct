import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MATERIAL } from './material';

import { DistancePipe } from './pipes/distance.pipe';
import { FixedPipe } from './pipes/fixed.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL
  ],
  declarations: [
    DistancePipe,
    FixedPipe
  ],
  exports: [
    DistancePipe,
    FixedPipe
  ]
})
export class SharedModule { }
