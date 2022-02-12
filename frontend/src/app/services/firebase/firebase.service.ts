import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  authState: any = null;
  authUser: any = null;
  constructor(public auth: AngularFireAuth, private parkerAuth: AuthService) {
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

  SignUp(email: string, password: string) {
    this.auth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully signed up!', res);
      
    })
    .catch(error => {
      console.log('Something is wrong in Signup:');
    });
  }
  passwordResetEmail(email: string){
    this.auth.sendPasswordResetEmail(email).then(
      () => {
        console.log('Password reset email sent');
      })
      .catch((error) => {
        console.log('Error in password reset');
      });
  } 
  SignIn(email: string, password: string) {
    this.auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      this.authUser = res
    console.log('You are Successfully logged in!');
    })
    .catch(err => {
    console.log('Something is wrong in SignIn:'); 
    });
  }
  
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      success => {
        console.log('Authentication succeeded', success);
        this.authUser = success.additionalUserInfo
        let useruid = success.user?.uid
        success.user?.getIdToken().then( firebaseToken => {
          if (success.additionalUserInfo?.isNewUser && useruid)
          {
            this.parkerAuth.registerUserToParker(firebaseToken, useruid)
            .subscribe( user => {
              console.log('register user successful', user)
            })
          }
        })
      })
      .catch(err => {
        console.log('Error in firebase authentication');
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
