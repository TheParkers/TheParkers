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
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './services';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockFirebaseService: any;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
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
          { provide: FirebaseService, useValue: jasmine.createSpyObj('FirebaseService', ['googlelogin', 'logout']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    mockFirebaseService = TestBed.inject(FirebaseService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Test login success', () => {
    mockFirebaseService.googlelogin.and.returnValue(null)
    component.login()
    expect(component).toBeTruthy();
  });

  it('Test logout success', () => {
    mockFirebaseService.logout.and.returnValue(null)
    component.logout()
    expect(component).toBeTruthy();
  });

});
