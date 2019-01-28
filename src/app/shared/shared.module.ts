import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  declarations: []
})
export class SharedModule { }
