import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '@core/auth.service';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sol-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  languages: string[] = [
    'Français',
    'Espanol',
    'English',
    'Flemish',
    'Deutsh',
    'Russki'
  ];

  bookForm: FormGroup;
  valid = false;
  picture: string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    private authService: AuthService,
    private bookService: BooksService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.bookForm = this.createBookForm();
  }

  ngOnInit() {}

  createBookForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl(''),
      language: new FormControl(''),
      published: new FormControl('', Validators.required), summary: new FormControl(''),
      picture: new FormControl(''),
      external: new FormControl('')
    });
  }

  revert() {
    this.bookForm.reset();
  }

  /**
   * when submit of form is requested then the book is created
   */
  createBook() {

    console.log('creation de bookne: ' + JSON.stringify(this.bookForm.value));
    // this.snackBar.open('Add book: ' + this.name + ', ' + this.surname, '', {
    //   duration: 2000
    // });
    this.bookService.createBook(this.bookForm.value);
    // this.surname = '';
    // this.name = '';
  }

  uploadView(event) {
    const file = event.target.files[0];
    const path = 'books/' + file.name;
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
