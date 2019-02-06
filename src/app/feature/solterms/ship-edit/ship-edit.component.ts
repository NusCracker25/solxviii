import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material';
import { ShipsService } from '../ships.service';
import { AuthService } from '@core/auth.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sol-ship-edit',
  templateUrl: './ship-edit.component.html',
  styleUrls: ['./ship-edit.component.scss']
})
export class ShipEditComponent implements OnInit {
  shipForm: FormGroup;
  valid = false;
  picture: string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    private authService: AuthService,
    private shipService: ShipsService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.shipForm = this.createShipForm();
  }

  ngOnInit() {
  }
  createShipForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      details: new FormControl(''),
      construction: new FormControl('', Validators.required),
      engineer: new FormControl(''),
      arsenal: new FormControl(''),
      destruction: new FormControl(''),
      picture: new FormControl(''),
      external: new FormControl('')
    });
  }

  revert() {
    this.shipForm.reset();
  }

  /**
   * when submit of form is requested then the ship is created
   */
  createShip() {

    this.shipService.createShip(this.shipForm.value);
    console.log('creation de ship: ' + JSON.stringify(this.shipForm.value));
    this.snackBar.open('Add ship: ' +  this.shipForm.value.name , '', {
      duration: 2000
  });
    // this.surname = '';
    // this.name = '';
  }

  uploadView(event) {
    const file = event.target.files[0];
    const path = 'ships/' + file.name;
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
