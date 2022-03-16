import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { BookingComponent } from './booking.component';
import { BookingService } from 'src/app/services';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let bookingservice: BookingService
  let modalctrl: ModalController
  let fixture: ComponentFixture<BookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
          { provide: BookingService, useValue: jasmine.createSpyObj('BookingService', ['createBooking']) },
            ModalController
      ],
      declarations: [ BookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    bookingservice = TestBed.inject(BookingService);
    modalctrl = TestBed.inject(ModalController);
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
