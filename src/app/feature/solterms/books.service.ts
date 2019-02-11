import { Injectable } from '@angular/core';
import { Book } from './book';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksCollection: AngularFirestoreCollection <Book>;
  bookDoc: AngularFirestoreDocument <Book>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.booksCollection = this.afs.collection('books', ref => ref.orderBy('name', 'asc'));
   }

  getBooks() {
    return this.booksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Book;
          const id = a.payload.doc.id;
         // data.uid = id;
          return {id, ...data };
        });
      })
    );
  }

  getBookData(id: string) {
    this.bookDoc = this.afs.doc<Book>('books/' + id);
    return this.bookDoc.valueChanges();

  }

  createBook(data: Book) {
    this.booksCollection.add(data);
  }

  getBook(id: string) {
    return this.afs.doc<Book>('books/' + id);
  }

  deleteBook(id: string) {
    return this.getBook(id).delete();
  }

  updateBook(id: string, uData ) {
    return this.getBook(id).update(uData);
  }
}
