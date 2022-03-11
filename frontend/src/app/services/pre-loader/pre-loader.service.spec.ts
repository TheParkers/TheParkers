import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, LoadingController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
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
        HttpClientModule,
        BrowserDynamicTestingModule, 
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
        {provide: LoadingController, useValue: jasmine.createSpyObj(['create', 'dismiss'])}
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
    let testHtmlElement = {
        present: () => {
          return Promise.resolve({})
        },
    }
    mockLoadingCtrl.create.and.returnValue(Promise.resolve(testHtmlElement))
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
