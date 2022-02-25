import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
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
import { Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FirebaseService } from 'src/app/services';
import { environment } from 'src/environments/environment.dev';
import { SearchParkingComponent } from '..';
import { ParkersHeaderComponent } from '../parkers-header/parkers-header.component'
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockFirebaseService: any;
  let platformService: any;
  let routerService: any;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, SearchParkingComponent, ParkersHeaderComponent ],
      imports: [BrowserDynamicTestingModule, 
                IonicModule.forRoot(), 
                AppRoutingModule,
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
          { provide: FirebaseService, useValue: jasmine.createSpyObj('FirebaseService', ['login', 'logout', 'isAuthenticatedWithParker']) },
          { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    mockFirebaseService = TestBed.inject(FirebaseService);
    routerService = TestBed.inject(Router);
    platformService = TestBed.inject(Platform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Test user already parker authenticated', () => {
    mockFirebaseService.isAuthenticatedWithParker.and.returnValue(true)
    expect(component).toBeTruthy();
    expect(routerService.navigate).toHaveBeenCalledWith(['/dashboard'])
  });

  it('Test login success', () => {
    routerService.navigate.and.returnValue('/')
    mockFirebaseService.login.and.returnValue(Promise.resolve({}))
    component.login()
    expect(component).toBeTruthy();
  });

  it('Test logout success', () => {
    routerService.navigate.and.returnValue('/')
    mockFirebaseService.logout.and.returnValue(null)
    component.logout()
    expect(component).toBeTruthy();
  });

});
