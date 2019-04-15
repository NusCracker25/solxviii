export interface User {

  uid: string; // reference in firebase user database
  email: string; //email to send mail to
  avatarURL?: string; //user's face
  displayName: string; //name of the user
  preferences?: string; // contains all app preferences stuff, stored as json to string
}
