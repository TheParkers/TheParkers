import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment.dev';
import { AppRoutingModule } from '../app-routing.module';
import { FirebaseService } from '../services/firebase/firebase.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockFirebaseService: any;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [BrowserDynamicTestingModule, 
                IonicModule.forRoot(), 
                AppRoutingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [
          { provide: FirebaseService, useValue: jasmine.createSpyObj('FirebaseService', ['login', 'logout']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    mockFirebaseService = TestBed.inject(FirebaseService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Test login success', () => {
    mockFirebaseService.login.and.returnValue(null)
    component.login()
    expect(component).toBeTruthy();
  });

  it('Test logout success', () => {
    mockFirebaseService.logout.and.returnValue(null)
    component.logout()
    expect(component).toBeTruthy();
  });

});
