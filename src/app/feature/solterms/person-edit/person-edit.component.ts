import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@core/auth.service';
import { PersonsService } from '../persons.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sol-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  languages: string[] = [
    'Français',
    'Espanol',
    'English',
    'Flemish',
    'Deutsh',
    'Russki'
  ];

  personFormGroup: FormGroup;
  valid = false;
  picture: string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    private authService: AuthService,
    private personService: PersonsService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.personFormGroup = this.createPersonForm();
  }

  ngOnInit() {}

  createPersonForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      language: new FormControl(''),
      details: new FormControl(''),
      birth: new FormControl('', Validators.required),
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
      surname: this.personFormGroup.get('surname'),
      name: this.personFormGroup.get('name'),
      birth: this.personFormGroup.get('birth'),
      death: this.personFormGroup.get('death'),
      picture: this.personFormGroup.get('picture'),
      creation: new Date(),
      author: this.authService.currentUserId
    };
    console.log('creation de personne: ' + JSON.stringify(this.personFormGroup.value));
    // this.snackBar.open('Add person: ' + this.name + ', ' + this.surname, '', {
    //   duration: 2000
    // });
    this.personService.createPerson(this.personFormGroup.value);
    // this.surname = '';
    // this.name = '';
  }

  uploadView(event) {
    const file = event.target.files[0];
    const path = 'persons/' + file.name;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files'); // utiliser snackbar
    } else {
      const fileRef = this.afStorage.ref(path);
      const task = this.afStorage.upload(path, file);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => (this.picture = url));
          })
        )
        .subscribe();
      // this.downloadURL.subscribe(url => this.view = url);
    }
  }
}
