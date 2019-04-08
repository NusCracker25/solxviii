import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { UsersService } from '@core/users.service';
import { User } from '@core/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'sol-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userFormGroup: FormGroup;
  valid = false;
  avatar: string;
  user: User;

  uploadPercent: Observable<number>;
  avatarURL: Observable<string>;
  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.userFormGroup = this.createUserForm();
  }

  ngOnInit() {

  }

  createUserForm(): FormGroup {
    return new FormGroup({
      displayName: new FormControl('', Validators.required),
      surname: new FormControl(''),
      language: new FormControl(''),


      avatar: new FormControl(''),
      external: new FormControl('')
    });
  }

  revert() {
    this.userFormGroup.reset();
  }

  updateUser() {
    console.log('update user with: '+ JSON.stringify(this.userFormGroup.value));
  }

  uploadAvatar(event) {
    const file = event.target.files[0];
    const path = 'users/' + file.name;
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
          this.avatarURL = fileRef.getDownloadURL();
          this.avatarURL.subscribe(
            url => this.avatar = url
          );
        }
        )
     )
    .subscribe();
     this.avatarURL.subscribe(url => this.avatar = url);
    }
  }
}
