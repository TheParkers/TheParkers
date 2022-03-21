import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { BookingComponent } from './booking.component';
import { BookingService } from 'src/app/services';
import { AngularDelegate } from '@ionic/angular';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let bookingservice: BookingService
  let modalctrl: ModalController
  let angdelegate: AngularDelegate
  let fixture: ComponentFixture<BookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
          { provide: BookingService, useValue: jasmine.createSpyObj('BookingService', ['createBooking']) },
            ModalController,
            AngularDelegate
      ],
      declarations: [ BookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    bookingservice = TestBed.inject(BookingService);
    modalctrl = TestBed.inject(ModalController);
    angdelegate = TestBed.inject(AngularDelegate);
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    component.parkingSpace = {parking_features:{}}
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test close success', () =>
   {
    modalctrl.dismiss()
    component.close()
    expect(component).toBeTruthy();
  });

  it('Test booking', () =>
   {
    bookingservice.createBooking(1,new Date, new Date)
    expect(bookingservice).toBeTruthy();
    component.booking()
  });
});
