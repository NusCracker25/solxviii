import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Term } from './term';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  termsCollection: AngularFirestoreCollection <Term>;
  termDoc: AngularFirestoreDocument <Term>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.termsCollection = this.afs.collection('solterms', ref => ref.orderBy('term', 'asc'));
   }

  getTerms() {
    return this.termsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Term;
          const id = a.payload.doc.id;
         // data.uid = id;
          return {id, ...data };
        });
      })
    );
  }

  getTermData(id: string) {
    this.termDoc = this.afs.doc<Term>('solterms/' + id);
    return this.termDoc.valueChanges();

  }

  createTerm(data: Term) {
    this.termsCollection.add(data);
  }

  getTerm(id: string){
    return this.afs.doc<Term>('solterms/' + id);
  }

  deleteTerm(id: string) {
    return this.getTerm(id).delete();
  }

  updateTerm(id: string, uData ) {
    return this.getTerm(id).update(uData);
  }
}
