import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonsService } from '../persons.service';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'sol-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {


  person: Person;
  editing: false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonsService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getTerm();
  }

  getTerm() {
    const uid = this.route.snapshot.paramMap.get('id');
    return this.personService.getPersonData(uid).subscribe( person => this.person = person);
  }

  delete() {
    const uid = this.route.snapshot.paramMap.get('id');
    this.personService.deletePerson(uid);
    this.router.navigate(['/home']);
  }

  updateTerm() {
    const uid = this.route.snapshot.paramMap.get('id');
    const formData = {
      person: this.person.name,
      definition: this.person.details,
      view: this.person.picture
    };
    this.personService.updatePerson(uid, formData);
    this.editing = false;
  }

}
