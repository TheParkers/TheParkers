import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat/app';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { Platform } from '@ionic/angular';
import { LocalStorageService } from '..';
import { LocalStorageModel } from 'src/app/models';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit{
  authState: any = null;
  authUser: any = null;
  constructor(public auth: AngularFireAuth, 
              private parkerAuth: AuthService, 
              private platform: Platform,
              private localStorageService : LocalStorageService,
              private router: Router
              ) {
   }
  ngOnInit(): void {
    this.auth.authState.subscribe(authState => {
      this.authState = authState
    });
    let parker_token = this.localStorageService.getItem(LocalStorageModel.autheticationToken)
      if (parker_token)
      {
        this.parkerAuth.getSignedInUser().subscribe({
          next: response => {
              this.authUser = response
          },
          error: (error) => {
            console.log('Firebase service init failed: User not authorised', error)
            this.localStorageService.removeItem(LocalStorageModel.autheticationToken)
          }
        })
      }
  }

  get getAuthState() {
      return this.authState
  }

  get getAuthUser() {
      return this.authUser
  }

  get isAuthenticatedWithFirebase() {
      return this.authUser != null;
  }

  get isAuthenticatedWithParker() {
    let parker_token = this.localStorageService.getItem(LocalStorageModel.autheticationToken)
      if (parker_token)
          return true
      return false
  }
  get isEmailVerified(): boolean {
      return this.isAuthenticatedWithFirebase ? this.authState.emailVerified : false;
  }
  get currentUserId(): string {
      return this.isAuthenticatedWithFirebase ? this.authState.uid : null
  }

  clearAuthStates() {
    this.authState = null;
    this.authUser = null;
    this.localStorageService.removeItem(LocalStorageModel.autheticationToken);
    this.router.navigate(['/'])
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
            error: error => {
              console.log(error)
              this.clearAuthStates()
            }
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
  
  async googlelogin(): Promise<any> {
    return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(success => {
           this.firebaseGoogleAuth(success);
      })
      .catch(err => {
          console.error('Error in firebase authentication',err);
          this.clearAuthStates()
      });
  }

  /* istanbul ignore next */
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
      this.clearAuthStates()
      console.log('Capacitor Signin with google',error);
      return error
    })
  }

  public firebaseGoogleAuth(user: firebase.auth.UserCredential) {
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
                  this.router.navigate(['/dashboard'])
                },
                error: error => {
                  console.error(error)
                  this.clearAuthStates()
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
              this.localStorageService.setItem(LocalStorageModel.autheticationToken, response.parker_token)
              this.authUser = response.user
              this.router.navigate(['/dashboard'])
            },
            error: error => {
              console.error('Login user to parker',error)
              this.clearAuthStates()
            }
            });
        }
    }).catch( error => {
      console.error('login to parker failed, invalid google user')
      this.clearAuthStates()
    });
  }

  logout() {
    this.auth.signOut().then(
      success => {
        console.log('Logout success', success);
        this.clearAuthStates();
      })
      .catch(err => {
        console.log('Error in logout');
    });
  }
}
