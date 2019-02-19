import { Injectable } from '@angular/core';
import { Person } from './person';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  personsCollection: AngularFirestoreCollection <Person>;
  personDoc: AngularFirestoreDocument <Person>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.personsCollection = this.afs.collection('persons', ref => ref.orderBy('name', 'asc'));
   }

  getPersons() {
    return this.personsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Person;
          const id = a.payload.doc.id;
         // data.uid = id;
          return {id, ...data };
        });
      })
    );
  }

  getPersonData(id: string) {
    this.personDoc = this.afs.doc<Person>('persons/' + id);
    return this.personDoc.valueChanges();

  }

  createPerson(data: Person) {
    console.log('createion d\'une personne ' + JSON.stringify(data));
    this.personsCollection.add(data);
  }

  getPerson(id: string) {
    return this.afs.doc<Person>('persons/' + id);
  }

  deletePerson(id: string) {
    return this.getPerson(id).delete();
  }

  updatePerson(id: string, uData ) {
    return this.getPerson(id).update(uData);
  }
}
