import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router, UrlTree } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment.dev';
import { FirebaseService } from '../firebase/firebase.service';

import { GuardService } from './guard.service';

describe('GuardService', () => {
  let service: GuardService;
  let firebaseService: any;
  let router: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        {provide: FirebaseService, useValue: jasmine.createSpyObj(['isAuthenticatedWithParker']) },
        {provide: Router, useValue: jasmine.createSpyObj(['parseUrl']) },
        GuardService
      ]

    });
    firebaseService = TestBed.inject(FirebaseService);
    router = TestBed.inject(Router)
    service = TestBed.inject(GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Guard canActivate returns present url for successfull authentication', () => {
    Object.defineProperty(firebaseService, 'isAuthenticatedWithParker', { get: () => true })
    let sampleFragment = 'sampleFragment'
    let samplepresentUrl = new UrlTree()
    samplepresentUrl.fragment = sampleFragment
    router.parseUrl.and.returnValue(samplepresentUrl)
    let result = service.canActivate()
    console.log(result)
    expect(result).toBeTruthy();
    });

  it('Guard canActivate returns home url for successfull authentication', () => {
    Object.defineProperty(firebaseService, 'isAuthenticatedWithParker', { get: () => false })
    let sampleFragment = 'sampleFragment'
    let samplepresentUrl = new UrlTree()
    samplepresentUrl.fragment = sampleFragment
    router.parseUrl.and.returnValue(samplepresentUrl)
    let result = service.canActivate()
    console.log(result)
    expect(result instanceof UrlTree).toBeTruthy();
  });
});
