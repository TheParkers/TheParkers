import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IonicModule, LoadingController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LocalStorageModel } from 'src/app/models';
import { FirebaseService } from '..';

import { PreLoaderService } from './pre-loader.service';

describe('PreLoaderService', () => {
  let service: PreLoaderService;
  let mockLoadingCtrl: any;
  let mockFirebaseService: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        HttpClientModule
      ],
      providers: [
        {provide: LoadingController, useValue: jasmine.createSpyObj(['create', 'dismiss'])},
        {provide: FirebaseService, useValue: jasmine.createSpyObj(['clearAuthStates'])}
      ]
    });
    service = TestBed.inject(PreLoaderService);
    mockLoadingCtrl = TestBed.inject(LoadingController);
    mockFirebaseService = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test present loader create success', () => {
    mockLoadingCtrl.create.and.returnValue(Promise.resolve("test response"))
    service.presentLoader()
    expect(service).toBeTruthy();
  });
  it('test dismiss loader dismiss success', () => {
    mockLoadingCtrl.dismiss.and.returnValue(Promise.resolve({}));
    service.dismissLoader()
    expect(service).toBeTruthy();
  });
  it('test dismiss loader failure', () => {
    mockLoadingCtrl.dismiss.and.returnValue(Promise.reject({}));
    service.dismissLoader();
    expect(service).toBeTruthy();
  });
});
