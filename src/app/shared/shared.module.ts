import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';

import { FormsModule,
ReactiveFormsModule } from '@angular/forms';

import { MeasurePipe } from './pipes/measure.pipe';


@NgModule({
  imports: [
    CommonModule,
   // ThreeDModule,
    SharedRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
  //  ThreeDModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MeasurePipe
  ],
  declarations: [MeasurePipe]
})
export class SharedModule { }
