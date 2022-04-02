import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularDelegate } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BookingComponent } from '../booking/booking.component';
import { ParkingSpace } from 'src/app/models/parking/parking.model';

import { ParkingSpaceDescComponent } from './parking-space-desc.component';
import { Router } from '@angular/router';

describe('ParkingSpaceDescComponent', () => {
  let component: ParkingSpaceDescComponent;
  let modalCtr: ModalController;
  let angdelegate: AngularDelegate;
  let fixture: ComponentFixture<ParkingSpaceDescComponent>;
  let mockParkingSpace  = {
        "id": 2,
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
        "tpk_vehicle_capacity": 2,
        "tpk_created_on": "2022-03-21T08:23:18.433994Z",
        "tpk_last_booked": "2022-03-21T08:23:17.198000Z",
        "tpk_is_booked": false
    };
  beforeEach(async () => {
    class RouterStub{
      getCurrentNavigation(){
        return {
           extras: {
              state:{
                startDate: '32432535344353',
                endDate: '563646476577'
              }
            }
          }
        }
     }
    await TestBed.configureTestingModule({
      providers: [
        ModalController,
        AngularDelegate,
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [ ParkingSpaceDescComponent ],
      imports: [MatIconModule, MatExpansionModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    modalCtr = TestBed.inject(ModalController);
    angdelegate = TestBed.inject(AngularDelegate);
    fixture = TestBed.createComponent(ParkingSpaceDescComponent);
    component = fixture.componentInstance;
    component.parkingSpace = mockParkingSpace;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('Test modal create', () => {
    component.initModal([]);
    expect(component).toBeTruthy();
  });
   
  


});
