import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';

import { FormsModule,
ReactiveFormsModule } from '@angular/forms';
import { ThreeDModule } from './threeD/threeD.module';


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
    ReactiveFormsModule
  ],
  declarations: []
})
export class SharedModule { }
