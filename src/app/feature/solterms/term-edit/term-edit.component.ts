import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { TermsService } from '../terms.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sol-term-edit',
  templateUrl: './term-edit.component.html',
  styleUrls: ['./term-edit.component.scss']
})
export class TermEditComponent implements OnInit {

  termForm: FormGroup;
  valid = false;
  picture: string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  constructor(
    private authService: AuthService,
    private termService: TermsService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage
  ) {
    this.termForm = this.createTermForm();
  }

  ngOnInit() {
  }
  createTermForm(): FormGroup {
    return new FormGroup({
      term: new FormControl('', Validators.required),
      definition: new FormControl('', Validators.required),
      picture: new FormControl('')
    });
  }

  revert() {
    this.termForm.reset();
  }

  createTerm() {
    const data = {
      term: this.termForm.value.term,
      def: [ {
        content: this.termForm.value.definition,
        source: null,
        author_id: null
      }],
      view: this.picture,
      creation: new Date(),
      authors: [this.authService.currentUserId],
      // author: this.authService.authState.displayName || this.authService.authState.email
    };
    console.log("creation de "+JSON.stringify(data));
    this.snackBar.open( 'Add term: ' + data.term, '', { duration: 2000, } );
    this.termService.createTerm(data);
    this.revert();
  }

  uploadView(event) {
    const file = event.target.files[0];
    const path = 'solterms/' + file.name;
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
     this.downloadURL.subscribe(url => this.picture = url);
    }
  }

}
