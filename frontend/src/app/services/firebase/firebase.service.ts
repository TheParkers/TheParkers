import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat/app';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'

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

      GoogleAuth.initialize({
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
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
    .then(success => {
      console.log('You are Successfully signed up!', success);
      let useruid = success.user?.uid
        success.user?.getIdToken().then( firebaseToken => {
          if (success.additionalUserInfo?.isNewUser && useruid)
          {
            this.parkerAuth.registerUserToParker(firebaseToken, useruid)
            .subscribe( user => {
              console.log('register user successful', user)
            })
          }
        });
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
      console.log('You are Successfully logged in!');
      res.user?.getIdToken().then( firebaseToken => {
          this.parkerAuth.loginUserToParker(firebaseToken)
          .subscribe( user => {
            console.log('Login user successful', user)
          })
      });
    })
    .catch(err => {
    console.log('Something is wrong in SignIn:'); 
    });
  }
  
  googlelogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      success => {
          this.firebaseGoogleAuth(success);
      })
      .catch(err => {
        console.log('Error in firebase authentication',err);
      });
  }

  private firebaseGoogleAuth(user: firebase.auth.UserCredential) {
        console.log('Authentication succeeded', user);
        this.authUser = user.additionalUserInfo
        let useruid = user.user?.uid
        user.user?.getIdToken().then( firebaseToken => {
          if (user.additionalUserInfo?.isNewUser && useruid)
          {
            this.parkerAuth.registerUserToParker(firebaseToken, useruid)
            .subscribe( () => {
                console.log('register user successful', user.user)
                  this.parkerAuth.loginUserToParker(firebaseToken)
                  .subscribe( user => {
                    console.log('first time Google Login user successful', user)
                  });
            })
          }
          else {
                this.parkerAuth.loginUserToParker(firebaseToken)
                .subscribe( user => {
                  console.log('Google Login user successful', user)
                });
            }
        });
  }

  async capacitorGoogleLogin()
  {
    GoogleAuth.signIn().then((user) => {
      this.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.authentication.idToken))
      .then((credential)=> {
            this.firebaseGoogleAuth(credential)
      }).catch((error) => {
          console.error('Capacitor Signin with firebase',error)
      });
    }).catch((error) => {
      console.log('Capacitor Signin with google',error);
    })
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
