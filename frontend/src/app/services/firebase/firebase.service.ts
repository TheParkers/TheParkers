import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat/app';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth'
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  authState: any = null;
  authUser: any = null;
  constructor(public auth: AngularFireAuth, private parkerAuth: AuthService, private platform: Platform) {
      this.auth.authState.subscribe(authState => {
          this.authState = authState
      })
   }

  get getAuthState() {
      return this.authState
  }

  get getAuthUser() {
      return this.authUser
  }

  get isAuthenticatedWithFirebase() {
      return this.getAuthState != null;
  }

  get isAuthenticatedWithParker() {
      return this.getAuthUser != null;
  }

  get isEmailVerified(): boolean {
      return this.isAuthenticatedWithFirebase ? this.authState.emailVerified : false;
  }
  get currentUserId(): string {
      return this.isAuthenticatedWithFirebase ? this.authState.uid : null
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

  signIn(email: string, password: string) {
    this.auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully logged in!');
      res.user?.getIdToken().then( firebaseToken => {
          this.parkerAuth.loginUserToParker(firebaseToken)
          .subscribe({ 
            next: user => { 
              this.authUser = user.user
              console.log('Login user successful with email and password', user) 
            },
            error: error => console.log(error)
          })
      });
    })
    .catch(err => {
    console.log('Something is wrong in SignIn:'); 
    });
  }

  login(): Promise<any> {
    if (!this.platform.is('capacitor'))
    {
      return this.googlelogin()
    }
    return this.capacitorGoogleLogin()
  }
  
  googlelogin(): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(success => {
           this.firebaseGoogleAuth(success);
      })
      .catch(err => {
          console.error('Error in firebase authentication',err);
          this.authUser = null
          return err
      });
  }

  async capacitorGoogleLogin(): Promise<any> {
    await GoogleAuth.signIn().then(async (user) => {
      await this.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.authentication.idToken))
      .then(credential => {
          return this.firebaseGoogleAuth(credential)
      }).catch((error) => {
          console.error('Capacitor Signin with firebase',error)
          return error 
      });
    }).catch((error) => {
      console.log('Capacitor Signin with google',error);
      return error
    })
  }

  private firebaseGoogleAuth(user: firebase.auth.UserCredential) {
    this.authUser = user.additionalUserInfo
    let useruid = user.user?.uid
    user.user?.getIdToken().then( firebaseToken => {
      if (user.additionalUserInfo?.isNewUser && useruid)
      {
        this.parkerAuth.registerUserToParker(firebaseToken, useruid)
        .subscribe( () => {
            console.log('register user to parker successful', user.user)
              this.parkerAuth.loginUserToParker(firebaseToken)
              .subscribe({ 
                next: response => {
                  console.log('Login first time user to parker successful', user)
                  this.authUser = response.user
                },
                error: error => {
                  console.error(error)
                  this.authUser = null
                }
              })
        })
      }
      else 
      {
        this.parkerAuth.loginUserToParker(firebaseToken)
        .subscribe({ 
            next: response => {
              console.log('Login user to parker successful', response.user)
              this.authUser = response.user
            },
            error: error => {
              console.error('Login user to parker',error)
              this.authUser = null
            }
            });
        }
    }).catch( error => {
      console.error('login to parker failed, invalid google user')
      this.authUser = null
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
