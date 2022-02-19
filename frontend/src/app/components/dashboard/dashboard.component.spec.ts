import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FirebaseService } from 'src/app/services';
import { environment } from 'src/environments/environment.dev';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockFirebaseService: any;
  let mockActionSheetService: any;
  let mockActionServiceConfig = {
    cssClass: 'my-custom-class',
    translucent: false,
    buttons: [{
      text: 'Bookings',
      role: 'bookings',
      icon: 'cart-outline',
      id: 'delete-button',
      data: {
        type: 'delete'
      },
      handler: () => {
        console.log('Bookings clicked');
      }
    }, {
      text: 'Rentals',
      icon: 'car-sport-outline',
      data: 10,
      handler: () => {
        console.log('Rentals clicked');
      }
    }, {
      text: 'Profile',
      icon: 'person-circle-outline',
      data: 'Data value',
      handler: () => {
        console.log('control sheet profile clicked');
      }
    }]
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule, 
        HttpClientModule,
        IonicModule.forRoot(), 
        AppRoutingModule,
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
      declarations: [ DashboardComponent ],
      providers: [
        { provide: FirebaseService, useValue: jasmine.createSpyObj('FirebaseService', ['logout'])},
        { provide: ActionSheetController, useValue: jasmine.createSpyObj('ActionSheetController', ['create'])}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    mockFirebaseService = TestBed.inject(FirebaseService);
    mockActionSheetService = TestBed.inject(ActionSheetController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test action control sheet', async () => {
      let actualbuttons = environment.actionSheetConfig(null).buttons
      expect(actualbuttons.length).toEqual(mockActionServiceConfig.buttons.length)
      actualbuttons.forEach( (element, index) => {
          expect(element.data).toEqual(mockActionServiceConfig.buttons[index].data)
          expect(element.icon).toEqual(mockActionServiceConfig.buttons[index].icon)
          expect(element.id).toEqual(mockActionServiceConfig.buttons[index].id)
          expect(element.role).toEqual(mockActionServiceConfig.buttons[index].role)
          expect(element.text).toEqual(mockActionServiceConfig.buttons[index].text)
      });
  });
});
