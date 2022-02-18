import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IonicModule } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ParkerSinginResponse, User } from '../../models/responses/user';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        HttpClientModule,
      ],
      providers: [
        {provide: HttpClient, useValue: jasmine.createSpyObj(['put' ,'post']) },
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test registerUserToParker success', () => {
    expect(service).toBeTruthy();
    let token = 'sampletoken'
    let uid = 'testuid'
    http.put.and.returnValue(of({sample:'test'}))
    service.registerUserToParker(token, uid)
  });
  

  it('test registerUserToParker failure', () => {
    const sampleUser: User = {
      tpk_email: "testemail",
      tpk_firebaseid: "testid",
      tpk_name: "testid",
      tpk_photoUrl: 'testurl'
  }
  const errorResponse: ParkerSinginResponse = {
      parker_token: "sampletoken",
      user: sampleUser
  }
    expect(service).toBeTruthy();
    let token = 'sampletoken'
    let uid = 'testuid'
    http.put.and.returnValue(throwError(() => errorResponse))
    let response = service.registerUserToParker(token, uid)
    response.subscribe( error => {
      expect(error).toEqual(errorResponse)
    });
    
  });

  it('test loginUsertoParker success', () => {
    expect(service).toBeTruthy();
    let token = 'sampletoken'
    http.post.and.returnValue(of({sample:'test'}))
    service.loginUserToParker(token)
  });

  it('test loginUsertoParker failure', () => {
    const sampleUser: User = {
        tpk_email: "testemail",
        tpk_firebaseid: "testid",
        tpk_name: "testid",
        tpk_photoUrl: 'testurl'
    }
    const errorResponse: ParkerSinginResponse = {
        parker_token: "sampletoken",
        user: sampleUser
    }
    expect(service).toBeTruthy();
    let token = 'sampletoken'
    http.post.and.returnValue(throwError(() => errorResponse))
    let response = service.loginUserToParker(token)
    response.subscribe( error => {
          expect(error.parker_token).toBe('sampletoken')
          expect(error.user).toBe(sampleUser)
    });
  });

});
