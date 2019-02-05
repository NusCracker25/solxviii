import { Injectable } from '@angular/core';
import { Ship } from './ship';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {
  shipsCollection: AngularFirestoreCollection <Ship>;
  personDoc: AngularFirestoreDocument <Ship>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.shipsCollection = this.afs.collection('ships', ref => ref.orderBy('name', 'asc'));
   }

  getShips() {
    return this.shipsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Ship;
          const id = a.payload.doc.id;
         // data.uid = id;
          return {id, ...data };
        });
      })
    );
  }

  getShipData(id: string) {
    this.personDoc = this.afs.doc<Ship>('ships/' + id);
    return this.personDoc.valueChanges();

  }

  createShip(data: Ship) {
    this.shipsCollection.add(data);
  }

  getShip(id: string) {
    return this.afs.doc<Ship>('ships/' + id);
  }

  deleteShip(id: string) {
    return this.getShip(id).delete();
  }

  updateShip(id: string, uData ) {
    return this.getShip(id).update(uData);
  }
}
