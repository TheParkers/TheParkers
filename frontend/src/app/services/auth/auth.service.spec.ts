import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IonicModule } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';

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
        {provide: HttpClient, useValue: jasmine.createSpyObj(['put']) },
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
    const errorResponse = new HttpErrorResponse({
      error: { code: `some code`, message: `some message.` },
      status: 400,
      statusText: 'Bad Request',
    });
    expect(service).toBeTruthy();
    let token = 'sampletoken'
    let uid = 'testuid'
    http.put.and.returnValue(throwError(() => new Error('test')))
    let response = service.registerUserToParker(token, uid)
    response.subscribe( error => {
      console.log(error.tpk_firebaseid)
      expect(error.tpk_firebaseid).toEqual(token)
    });
    
  });

  it('test loginUsertoParker success', () => {
    expect(service).toBeTruthy();
    let token = 'sampletoken'
    let uid = 'testuid'
    http.post.and.returnValue(of({sample:'test'}))
    service.loginUserToParker(token, uid)
  });

  it('test loginUsertoParker failure', () => {
    const errorResponse = new HttpErrorResponse({
      error: { code: `some code`, message: `some message.` },
      status: 400,
      statusText: 'Bad Request',
    });
    expect(service).toBeTruthy();
    let token = 'sampletoken'
    let uid = 'testuid'
    http.post.and.returnValue(throwError(() => new Error('test')))
    let response = service.loginUserToParker(token, uid)
    response.subscribe( error => {
      console.log(error.tpk_firebaseid)
      expect(error.tpk_firebaseid).toEqual(token)
    });
  });

});
