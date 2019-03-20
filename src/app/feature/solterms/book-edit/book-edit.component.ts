import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '@core/auth.service';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Person } from '../person';
import { PersonsService } from '../persons.service';

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

  authors: Observable<Person[]>;

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
    private formBuilder: FormBuilder,
    private personService: PersonsService
  ) {
    this.bookForm = this.createBookForm();
  }

  ngOnInit() {
    this.authors = this.personService.getPersons();
  }

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
    const book = {
      title: this.bookForm.value.title,
      author: this.bookForm.value.author.id,
      language: this.bookForm.value.language,
      published: this.bookForm.value.published,
      picture: this.bookForm.value.picture,
      url_ref: this.bookForm.value.external,
      creation : new Date(),
      user_creator : this.authService.currentUserId
    };
    this.snackBar.open('Add book: ' + this.bookForm.value.title , '', {
       duration: 2000
    });
    this.bookService.createBook(book);
    this.bookForm.reset();
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
