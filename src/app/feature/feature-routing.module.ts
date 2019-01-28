import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ConstructionComponent } from './solterms/construction/construction.component';
import { TermDetailComponent } from './solterms/term-detail/term-detail.component';
import { TermEditComponent } from './solterms/term-edit/term-edit.component';
import { BookLibraryComponent } from './solterms/book-library/book-library.component';
import { BookDetailComponent } from './solterms/book-detail/book-detail.component';
import { PersonDetailComponent } from './solterms/person-detail/person-detail.component';
import { PersonComponent } from './solterms/person/person.component';
import { PersonEditComponent } from './solterms/person-edit/person-edit.component';
import { ShipsComponent } from './solterms/ships/ships.component';
import { ShipDetailComponent } from './solterms/ship-detail/ship-detail.component';
import { ShipEditComponent } from './solterms/ship-edit/ship-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      {
        path: '',
        redirectTo: 'construction',
        pathMatch: 'full'
      },
      {
        path: 'construction',
        component: ConstructionComponent
      },
      {
        path: 'term/:id',
        component: TermDetailComponent
      },
      {
        path: 'new-term',
        component: TermEditComponent
      },
      {
        path: 'library',
        component: BookLibraryComponent
      },
      {
        path: 'book/:id',
        component: BookDetailComponent
      },
      {
        path: 'people',
        component: PersonComponent
      },
      {
        path: 'person/:id',
        component: PersonDetailComponent
      },
      {
        path: 'new-person',
        component: PersonEditComponent
      },
      {
        path: 'ships',
        component: ShipsComponent
      },
      {
        path: 'ship/:id',
        component: ShipDetailComponent
      },
      {
        path: 'new-ship',
        component: ShipEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
