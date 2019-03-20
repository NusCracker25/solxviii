import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../person';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PersonsService } from '../persons.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { ConstructionComponent } from '../construction/construction.component';

@Component({
  selector: 'sol-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  persons: Observable<Person[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public personService: PersonsService,
    public router: Router,
    public auth: AuthService) {

    }

  ngOnInit() {
    this.persons = this.personService.getPersons();
    console.log(this);
  }

  expand(id: string) {
  console.log('vers person '+id);

   this.router.navigate(['/home/person', id]);
  }
}
