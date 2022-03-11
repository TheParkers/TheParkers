import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, Observer, sample } from 'rxjs';
import { ParkerSinginResponse } from 'src/app/models';
import { environment } from 'src/environments/environment.dev';
import { LocalStorageService, PreLoaderService } from '..';

import { HttpInterceptorService } from './http-interceptor.service';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;
  let mockLocalStorageService: any;
  let mockPreloadeRservice: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          {provide: LocalStorageService, useValue: jasmine.createSpyObj(['getItem']) },
          {provide: PreLoaderService, useValue: jasmine.createSpyObj(['presentLoader', 'dismissLoader'])}
        ]
    });
    service = TestBed.inject(HttpInterceptorService);
    mockLocalStorageService = TestBed.inject(LocalStorageService);
    mockPreloadeRservice = TestBed.inject(PreLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test intercept happy flow', () => {
    let sampleHttpRequest = new HttpRequest("GET", environment.apiServer)
    let sampleResponse: ParkerSinginResponse = {
      parker_token: "test_token",
      user: {
        tpk_email: "testemail",
        tpk_firebaseid: "testid",
        tpk_name: "testname",
        tpk_photoUrl: "testurl"
      }
    }
    const next: any = {
      handle: () => {
        return new Observable((observer: Observer<ParkerSinginResponse>) => {
          observer.next(sampleResponse);
          observer.complete();
        });
      }
    };
    mockLocalStorageService.getItem.and.returnValue('test');
    let testoutput = service.intercept(sampleHttpRequest, next)
    expect(service).toBeTruthy();
    console.log(testoutput)
  });

  it('Test intercept with url not starting with api url', () => {
    let sampleHttpRequest = new HttpRequest("GET", "invalid url")
    let sampleResponse: ParkerSinginResponse = {
      parker_token: "test_token",
      user: {
        tpk_email: "testemail",
        tpk_firebaseid: "testid",
        tpk_name: "testname",
        tpk_photoUrl: "testurl"
      }
    }
    const next: any = {
      handle: () => {
        return new Observable((observer: Observer<ParkerSinginResponse>) => {
          observer.next(sampleResponse);
          observer.complete();
        });
      }
    };
    mockLocalStorageService.getItem.and.returnValue('test');
    let testoutput = service.intercept(sampleHttpRequest, next)
    expect(service).toBeTruthy();
    console.log(testoutput)
  });

  it('Test intercept with no auth token', () => {
    let sampleHttpRequest = new HttpRequest("GET", "invalid url")
    let sampleResponse: ParkerSinginResponse = {
      parker_token: "test_token",
      user: {
        tpk_email: "testemail",
        tpk_firebaseid: "testid",
        tpk_name: "testname",
        tpk_photoUrl: "testurl"
      }
    }
    const next: any = {
      handle: () => {
        return new Observable((observer: Observer<ParkerSinginResponse>) => {
          observer.next(sampleResponse);
          observer.complete();
        });
      }
    };
    mockLocalStorageService.getItem.and.returnValue(null);
    let testoutput = service.intercept(sampleHttpRequest, next)
    expect(service).toBeTruthy();
    testoutput.subscribe({
      next: (response) => {
        expect(response).toBeTruthy()
        console.log("obervable object",response)
      }
    })
    
  });
});