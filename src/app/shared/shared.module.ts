import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { DistancePipe } from './pipes/distance.pipe';
import { FixedPipe } from './pipes/fixed.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule
  ],
  declarations: [
    DistancePipe,
    FixedPipe,
    SearchComponent
  ],
  exports: [
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    AgmCoreModule,
    DistancePipe,
    FixedPipe,
    SearchComponent
  ]
})
export class SharedModule { }
