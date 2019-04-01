import { NgModule } from '@angular/core';
import {SharedModule} from '@shared/shared.module';

// import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { MainNavComponent } from './main-nav/main-nav.component';
// import { LayoutModule } from '@angular/cdk/layout';
// import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { SoltermsModule } from './solterms/solterms.module';
import { DevisModule } from './devis/devis.module';

@NgModule({
  declarations: [MainNavComponent],
  imports: [
    // CommonModule,
    FeatureRoutingModule,
    // LayoutModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    SharedModule,
    SoltermsModule,
    DevisModule
  ],
  exports: [
    MainNavComponent
  ]
})
export class FeatureModule { }
