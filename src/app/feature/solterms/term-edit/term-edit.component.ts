import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { TermsService } from '../terms.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sol-term-edit',
  templateUrl: './term-edit.component.html',
  styleUrls: ['./term-edit.component.scss']
})
export class TermEditComponent implements OnInit {

  term: string;
  content: string;
  view: string = null;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  constructor(
    private authService: AuthService,
    private termService: TermsService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  createTerm() {
    const data = {
      term: this.term,
      def: [ {
        content: this.content,
        source: null,
        author_id: null
      }],
      view: this.view,
      creation: new Date(),
      authors: [this.authService.currentUserId],
      // author: this.authService.authState.displayName || this.authService.authState.email
    };
    this.snackBar.open( 'Add term: ' + this.term, '', { duration: 2000, } );
    this.termService.createTerm(data);
    this.term = '';
    this.content = '';
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
            url => this.view = url
          );
        }
        )
     )
    .subscribe();
    // this.downloadURL.subscribe(url => this.view = url);
    }
  }

}
