import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevisRoutingModule } from './devis-routing.module';
import { DevisDdMonceauComponent } from './devis-dd-monceau/devis-dd-monceau.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DevisDdMonceauComponent],
  imports: [
    CommonModule,
    DevisRoutingModule,
    SharedModule
  ]
})
export class DevisModule { }
