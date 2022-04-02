import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bookings } from 'src/app/models/booking/booking.model';
import { bookinglist } from 'src/app/models/responses/bookinglist';
import { BookingDescComponent } from './booking-desc.component';

describe('BookingDescComponent', () => 
  {
    let component: BookingDescComponent;
    let fixture: ComponentFixture<BookingDescComponent>;
    let mockBooking : bookings = {
      "id": 123,
      "tpk_booking_user": {tpk_firebaseid: "12345"},
      "tpk_book_cancelled": false,
      "tpk_book_end_datetime": new Date(),
      "tpk_book_start_datetime": new Date(),
      "tpk_parkingspace":{
      "id": 2,
      "tpk_created_on": new Date(),
      "tpk_last_booked": new Date(),
      "tpk_is_booked": true,
      "tpk_ps_name": "testParking",
      "tpk_parking_features": {
          "tpk_has_car_charging": false,
          "tpk_has_car_wash": true,
          "tpk_has_indoor_parking": false
      },
      "tpk_ps_location": {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -80.5327216,
                  43.4844091
              ]
          },
          "properties": {
              "address": "155 Yorkville Ave, Toronto, ON M5R 1C4, Canada",
              "city": "Toronto",
              "country": "Canada",
              "area_code": "M5R 1C4"
          }
      },
      "tpk_user": "Im5ivM5TeCPVuEbB7hsz56ntYEK2",
      "tpk_parkingspace_images": [
          {
              "tpk_base64_image": "data:image/jpeg;base64,/AAQSkZJRgABAQAQABAADHBwcGhgcIS4lHCErIRwaJjgmKy8xNTU1HCQ7QDs",
          },
          {
              "tpk_base64_image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhwcHBwc",
          }
      ],
      "tpk_rating": 1,
      "tpk_description": "test description",
      "tpk_access_information": "Free access",
      "tpk_price_per_hour": 12,
      "tpk_parking_area": 30,
      "tpk_has_features": true,
      "tpk_vehicle_capacity": 2
    }
  };
    beforeEach(async () => 
      {
        await TestBed.configureTestingModule(
        {
          declarations: [ BookingDescComponent ],
          imports: 
          [
            MatIconModule, 
            MatExpansionModule, 
            BrowserAnimationsModule
          ]

        })
        .compileComponents();
      }
    );

    beforeEach(() => 
      {
        fixture = TestBed.createComponent(BookingDescComponent);
        component = fixture.componentInstance;
        component.booking = mockBooking;
        fixture.detectChanges();
      }
    );

    it('should create', () => 
      {
        expect(component).toBeTruthy();
      }
    );
  }
);
