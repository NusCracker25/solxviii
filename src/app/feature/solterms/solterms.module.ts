import { NgModule } from '@angular/core';
import { SharedModule} from '@shared/shared.module';
import { ConstructionComponent } from './construction/construction.component';
// import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
// import { LayoutModule } from '@angular/cdk/layout';
import { TermDetailComponent } from './term-detail/term-detail.component';
import { TermEditComponent } from './term-edit/term-edit.component';
import { TermsService } from './terms.service';
import { BookLibraryComponent } from './book-library/book-library.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { PersonComponent } from './person/person.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { ShipEditComponent } from './ship-edit/ship-edit.component';
import { ShipsComponent } from './ships/ships.component';

@NgModule({
  declarations: [ConstructionComponent, TermDetailComponent, TermEditComponent, BookLibraryComponent, BookDetailComponent, PersonComponent, PersonEditComponent, PersonDetailComponent, ShipDetailComponent, ShipEditComponent, ShipsComponent],
  imports: [
    SharedModule,
    // MatGridListModule,
    // MatCardModule,
    // MatMenuModule,
    // MatIconModule,
    // MatButtonModule,
    // LayoutModule
  ],
  providers: [
    TermsService
  ]
})
export class SoltermsModule { }
