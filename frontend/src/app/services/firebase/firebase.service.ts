import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  authState: any = null;
  authUser: any = null;
  constructor(public auth: AngularFireAuth) {
      this.auth.authState.subscribe(authState => {
          this.authState = authState
      })
   }

  get getAuthState() {
      return this.authState
  }
  get isAuthenticated() {
      return this.getAuthState != null;
  }

  get isEmailVerified(): boolean {
      return this.isAuthenticated ? this.authState.emailVerified : false;
  }
  get currentUserId(): string {
      return this.isAuthenticated ? this.authState.uid : null
  }



  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      success => {
        console.log('Authentication succeeded', success);
        this.authUser = success.additionalUserInfo
      })
      .catch(err => {
        console.log('Error in firebase authentication');
      });
  }

  passwordResetEmail(email: string){
    this.auth.sendPasswordResetEmail(email).then(
      () => {
        // template defined in the firebase
        console.log('Password reset email sent');
      })
      .catch((error) => {
        console.log('Error in password reset');
      });
  }

  logout() {
    this.auth.signOut().then(
      success => {
        console.log('Logout success', success);
      })
      .catch(err => {
        console.log('Error in logout');
      });
  }
}
