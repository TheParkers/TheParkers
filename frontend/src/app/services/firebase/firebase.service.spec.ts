import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment.dev';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FirebaseService } from './firebase.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let mockAuthService: any;
  let mockUserState: any;
  let authService: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        {provide: AngularFireAuth, useValue: jasmine.createSpyObj(['signInWithPopup', 'signOut', 'createUserWithEmailAndPassword' , 'signInWithEmailAndPassword',
        'sendPasswordResetEmail']) },
        {provide: AuthService, useValue: jasmine.createSpyObj(['registerUserToParker'])},
        FirebaseService
      ]
    });

    let mockAuthState = {
      emailVerified: true,
      uid: 'sample'
    }
    mockAuthService = TestBed.inject(AngularFireAuth)
    authService = TestBed.inject(AuthService)
    Object.defineProperty(mockAuthService, 'authState', { get: () => of(mockAuthState) })
    service = TestBed.inject(FirebaseService)

    
  });

  it('Test service initialization', () => {
      expect(service.authState).toBeTruthy()
      expect(service.isAuthenticated).toBeTruthy()
      expect(service.isEmailVerified).toBeTruthy()
      expect(service.currentUserId).toEqual('sample')
      expect(service).toBeTruthy();
  });

  it('Test service initialization failure', () => {
    spyOnProperty(service, 'getAuthState').and.returnValue(null)
    expect(service.isAuthenticated).toBeFalsy()
    expect(service.isEmailVerified).toBeFalsy()
    expect(service.currentUserId).toBeNull()
    expect(service).toBeTruthy();
  });

  it('Test successful login', () => {
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
    service.login()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful login if not new user', () => {
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
    service.login()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful login if not new user flag not provided', () => {
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
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.login()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful login if user not provided by firebase', () => {
    let sampleResponse = {
      
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.login()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test successful login if user uid not provided', () => {
    let sampleResponse = {
      user: {
      },
      additionalUserInfo:{
        isNewUser: false,
      }
    }
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.resolve(sampleResponse))
    authService.registerUserToParker.and.returnValue(of({user: 'sampleresponse'}))
    service.login()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });

  it('Test failure login', () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    mockAuthService.signInWithPopup.and.returnValue(Promise.reject(null))
    service.login()
    expect(mockAuthService.signInWithPopup).toHaveBeenCalledWith(googleAuthProvider)
  });
  
  it('Test successful signUp with email', () => {
    mockAuthService.createUserWithEmailAndPassword.and.returnValue(Promise.resolve("test@gmail.com"))
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
    service.SignIn("test@gmail.com","s")
    expect(mockAuthService.signInWithEmailAndPassword).toHaveBeenCalledWith("test@gmail.com","s")
  });

  it('Test successful login with email', () => {
    mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.resolve("test@gmail.com"))
    service.SignIn("test@gmail.com","s")
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
