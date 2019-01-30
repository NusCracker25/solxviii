import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ConstructionComponent } from './construction/construction.component';
import { TermDetailComponent } from './term-detail/term-detail.component';
import { TermEditComponent } from './term-edit/term-edit.component';
import { TermsService } from './terms.service';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookLibraryComponent } from './book-library/book-library.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { ShipEditComponent } from './ship-edit/ship-edit.component';
import { ShipsComponent } from './ships/ships.component';
import { PersonComponent } from './person/person.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonsService } from './persons.service';
import { ShipsService } from './ships.service';
import { BooksService } from './books.service';

@NgModule({
  declarations: [
    ConstructionComponent,
    TermDetailComponent,
    TermEditComponent,
    BookEditComponent,
    BookDetailComponent,
    BookLibraryComponent,
    ShipDetailComponent,
    ShipEditComponent,
    ShipsComponent,
    PersonComponent,
    PersonDetailComponent,
    PersonEditComponent
  ],
  imports: [SharedModule],
  providers: [TermsService, PersonsService, ShipsService, BooksService]
})
export class SoltermsModule {}
