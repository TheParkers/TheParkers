import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { BookingComponent } from './booking.component';
import { BookingService } from 'src/app/services';
import { UserDetails } from 'src/app/models/responses/user';
import { AuthService } from 'src/app/services';
import { of } from 'rxjs';
import { AngularDelegate } from '@ionic/angular';

describe('BookingComponent', () => 
{
  
  let component: BookingComponent;
  let bookingservice: BookingService
  let modalctrl: ModalController
  let angdelegate: AngularDelegate
  let fixture: ComponentFixture<BookingComponent>;
  let authService: any

  beforeEach(async () => 
  {
    let authUser: UserDetails = {
      user:
      {
          tpk_email: "testemail",
          tpk_name: "test name", 
          tpk_photoUrl: "test photo",
          tpk_firebaseid: "testId"
        }
      }

    await TestBed.configureTestingModule({
      
      providers: [
          { provide: BookingService, useValue: jasmine.createSpyObj('BookingService', ['createBooking']) },
            ModalController,
            AngularDelegate,
            { provide: AuthService, useValue: jasmine.createSpyObj(['registerUserToParker', 'loginUserToParker', 'getSignedInUser', 'getSignedInUser'])}
      ],
      declarations: [ BookingComponent ]
    })

    .compileComponents();
    authService = TestBed.inject(AuthService)
    authService.getSignedInUser.and.returnValue(of(authUser))

  });

  beforeEach(() => 
  {
    bookingservice = TestBed.inject(BookingService);
    modalctrl = TestBed.inject(ModalController);
    angdelegate = TestBed.inject(AngularDelegate);
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    component.parkingSpace = {tpk_ps_location:{properties:{}},parking_features:{}}
    fixture.detectChanges();
  });

  it('should create', () => 
    {
      expect(component).toBeTruthy();
    }
  );

  it('Test close success', () =>
   {
      modalctrl.dismiss()
      component.close()
      expect(component).toBeTruthy();
   }
  );

  it('Test booking', () =>
   {
      bookingservice.createBooking(1,new Date, new Date,"12")
      expect(bookingservice).toBeTruthy();
      component.booking()
   }
  );
  
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
