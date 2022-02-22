import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicModule, Platform } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment.dev';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FirebaseService } from './firebase.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '..';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LocalStorageModel } from 'src/app/models';
import { UserDetails } from 'src/app/models/responses/user';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let mockAuthService: any;
  let authService: any;
  let platformService: any;
  let mockLcocalStorageService: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDatepickerModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: jasmine.createSpyObj(['signInWithPopup',
                                                                   'signOut', 
                                                                   'createUserWithEmailAndPassword',
                                                                   'signInWithEmailAndPassword',
                                                                   'sendPasswordResetEmail',
                                                                   'signInWithCredential'
                                                                  ])},
        { provide: AuthService, useValue: jasmine.createSpyObj(['registerUserToParker', 'loginUserToParker', 'getSignedInUser'])},
        { provide: Platform, useValue: jasmine.createSpyObj(['is'])},
        { provide: LocalStorageService, useValue: jasmine.createSpyObj(['getItem', 'setItem','removeItem'])},
        FirebaseService
      ]
    });

    let mockAuthState = {
      emailVerified: true,
      uid: 'sample'
    }
    let authUser: UserDetails = {
                        tpk_email: "testemail",
                        tpk_name: "test name", 
                        tpk_photoUrl: "test photo"
                      }
    
    mockAuthService = TestBed.inject(AngularFireAuth)
    authService = TestBed.inject(AuthService)
    platformService = TestBed.inject(Platform)
    mockLcocalStorageService = TestBed.inject(LocalStorageService)
    Object.defineProperty(mockAuthService, 'authState', {get: () => of(mockAuthState) })
    service = TestBed.inject(FirebaseService)
    authService.getSignedInUser.and.returnValue(of(authUser))
    window.localStorage.setItem(LocalStorageModel.autheticationToken, 'testtoken')
    
  });

  it('Test service initialization', () => {
    service.authUser = {}
    expect(service.authState).toBeTruthy()
    expect(service.isAuthenticatedWithFirebase).toBeTruthy()
    expect(service.isEmailVerified).toBeTruthy()
    expect(service.currentUserId).toEqual('sample')
    expect(service).toBeTruthy()
  });

  it('Test isAuthenticatedWithParker true case', () => {
      service.authUser = 'test'
      mockLcocalStorageService.getItem.and.returnValue("test")
      expect(service.isAuthenticatedWithParker).toBeTruthy()
  });

  it('Test isAuthenticatedWithParker false case', () => {
    mockLcocalStorageService.getItem.and.returnValue(null)
    expect(service.isAuthenticatedWithParker).toBeFalsy();
});

  it('Test successful login for non capacitor app', () => {
    platformService.is.and.returnValue(false)
    spyOn(service, 'googlelogin')
    service.login()
    expect(service.googlelogin).toHaveBeenCalledTimes(1)
  });

  it('Test successful login for capacitor app', () => {
    platformService.is.and.returnValue(true)
    spyOn(service, 'capacitorGoogleLogin')
    service.login()
    expect(service.capacitorGoogleLogin).toHaveBeenCalledTimes(1)
  });

  it('Test service initialization failure', () => {
    mockLcocalStorageService.getItem.and.returnValue(null)
    spyOnProperty(service, 'getAuthState').and.returnValue(null)
    expect(service.isAuthenticatedWithFirebase).toBeFalsy()
    expect(service.isEmailVerified).toBeFalsy()
    expect(service.currentUserId).toBeNull()
    expect(service).toBeTruthy();
  });

  it('Test successful google signup', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    authService.loginUserToParker.and.returnValue(of({user: 'username'}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful google signup with first time user success login', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    authService.loginUserToParker.and.returnValue(of({user: 'username'}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful google signup with first time user success login', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    authService.loginUserToParker.and.returnValue(of({user: 'username'}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful google signup with first time user failure login', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    authService.loginUserToParker.and.returnValue(throwError(() => {}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
    expect(service.authUser).toBeFalsy()
  });

  it('Test successful google signin if not new user', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    authService.loginUserToParker.and.returnValue(of({user: 'username'}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful google signin not new user with parker signin failure', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    authService.loginUserToParker.and.returnValue(throwError(() => {}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
    expect(service.authUser).toBeFalsy()
  });

  it('Test successful google login if user flag not provided', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(of({user: 'username'}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful google login if user not provided by firebase', () => {
    let sampleResponse = {
      
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful google login if user uid not provided', () => {
    let sampleResponse = {
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful google with error in getToken signature', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.reject('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
    expect(service.authUser).toBeFalsy()
  });

  it('Test failure google login', () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.reject(null))
    service.googlelogin()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });
  
  it('Test successful signUp with email', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    mockAuthService.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.SignUp("test@gmail.com","s")
    expect(mockAuthService.createUserWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful signUp with email with no user uid', () => {
    let sampleResponse = {
      user: {
        // uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    mockAuthService.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.SignUp("test@gmail.com","s")
    expect(mockAuthService.createUserWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful signUp with email with no firebase token', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        // getIdToken: () => {
        //   return Promise.resolve('firebasetoken')
        // }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    mockAuthService.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.SignUp("test@gmail.com","s")
    expect(mockAuthService.createUserWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful signUp with email with no user info', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      }
    }
    mockAuthService.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.SignUp("test@gmail.com","s")
    expect(mockAuthService.createUserWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful signUp with email with no user', () => {
    let sampleResponse = {
      
    }
    mockAuthService.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.SignUp("test@gmail.com","s")
    expect(mockAuthService.createUserWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test failure signUp with email', () => {
    mockAuthService.createUserWithEmailAndPassword.and.returnValue(Promise.reject(null))
    service.SignUp("test@gmail.com","s")
    expect(mockAuthService.createUserWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });



  it('Test failure login with email', () => {
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.reject(null))
    service.signIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });



  it('Test successful login with email', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.signIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful login with email with parker login failure', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(throwError(() => {}))
    service.signIn("test@gmail.com","s")
    expect(service.getAuthUser).toBeFalsy()
  });

  it('Test successful login with email when fag is not false', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: true,
      }
    }
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.signIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful login with email with not user uid', () => {
    let sampleResponse = {
      user: {
        // uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.signIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful login with email email with no firebase token', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        // getIdToken: () => {
        //   return Promise.resolve('firebasetoken')
        // }
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.signIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful login with email email with no user info', () => {
    let sampleResponse = {
      user: {
        uid: 'sample uid',
        getIdToken: () => {
          return Promise.resolve('firebasetoken')
        }
      }
    }
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.signIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful login with email email with no user', () => {
    let sampleResponse = {

    }
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve(sampleResponse))
    authService.loginUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.signIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });


  it('Test successful password reset', () => {
    mockAuthService.sendPasswordResetEmail.and.returnValue(Promise.resolve(null))
    service.passwordResetEmail("test@gmail.com")
    expect(mockAuthService.sendPasswordResetEmail).toHaveBeenCalledWith("test@gmail.com")
  });

  it('Test failure password reset', () => {
    mockAuthService.sendPasswordResetEmail.and.returnValue(Promise.reject(null))
    service.passwordResetEmail("test@gmail.com")
    expect(mockAuthService.sendPasswordResetEmail).toHaveBeenCalledWith("test@gmail.com")
  }); 


  it('Test logout success', () => {
    mockAuthService.signOut.and.returnValue(Promise.resolve(null))
    service.logout()
    expect(mockAuthService.signOut).toHaveBeenCalled()
  });

  it('Test logout fail', () => {
    mockAuthService.signOut.and.returnValue(Promise.reject(null))
    service.logout()
    expect(mockAuthService.signOut).toHaveBeenCalled()
  });

});
