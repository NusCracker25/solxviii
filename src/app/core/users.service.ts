import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersCollection: AngularFirestoreCollection <User>;
  userDoc: AngularFirestoreDocument <User>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('user', 'asc'));
   }

  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
         // data.uid = id;
          return {id, ...data };
        });
      })
    );
  }

  getUserData(id: string) {
    this.userDoc = this.afs.doc<User>('users/' + id);
    return this.userDoc.valueChanges();

  }

  createUser(data: User) {
    this.usersCollection.add(data);
  }

  getUser(id: string){
    return this.afs.doc<User>('users/' + id);
  }

  getDisplayName(id:string): string{
    let us;
    this.getUser(id).valueChanges().subscribe( person => {
      us = person;
      console.log(JSON.stringify(us));
    });
    return us.displayName;
  }

  deleteUser(id: string) {
    return this.getUser(id).delete();
  }

  updateUser(id: string, uData ) {
    return this.getUser(id).update(uData);
  }

}
