import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@core/auth.service';
import { PersonsService } from '../persons.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'sol-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  languages: string[] = [
    'Français', 'Espanol' , 'English' , 'Flemish' , 'Deutsh' , 'Russki'
  ];

  personFormGroup: FormGroup;
  valid = false;

   surname: string;
   name: string;
   birth_st = new Date();
   death_st = new Date();

    content: string;
    picture: string = null;
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
  constructor(  private authService: AuthService,
    private personService: PersonsService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage)  {
      this.personFormGroup = this.createPersonForm();
     }

  ngOnInit() {
  }

createPersonForm(): FormGroup {
  return new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    language: new FormControl(''),
    birth: new FormControl(''),
    death: new FormControl(''),
    picture: new FormControl(''),
    external: new FormControl('')
  });
}

revert() {
  this.personFormGroup.reset();
}

/**
 * when submit of form is requested then the person is created
 */
  createPerson() {
    const data = {
      surname: this.surname,
      name: this.name,
      birth: new Date (this.birth_st),
      picture: this.picture,
      creation: new Date(),
      author: this.authService.currentUserId,

    };
    console.log('creation de personne: ' + JSON.stringify(data));
    this.snackBar.open( 'Add person: ' + this.name + ', ' + this.surname , '', { duration: 2000, } );
    this.personService.createPerson(data);
    this.surname = '';
    this.name = '';
  }

  uploadView(event) {
    const file = event.target.files[0];
    const path = 'persons/' + file.name;
    if ( file.type.split('/')[0] !== 'image') {
      return alert('only image files'); // utiliser snackbar
    } else {

      const fileRef = this.afStorage.ref(path);
      const task = this.afStorage.upload(path, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(
            url => this.picture = url
          );
        }
        )
     )
    .subscribe();
    // this.downloadURL.subscribe(url => this.view = url);
    }
  }
}

