import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserDetails } from 'src/app/models/responses/user';
import { AuthService } from 'src/app/services';
import { ParkingLocation} from 'src/app/models/parking/parking.model';

import { AddParkingComponent } from './add-parking.component';
import PlaceResult = google.maps.places.PlaceResult;

describe('AddParkingComponent', () => {
  let component: AddParkingComponent;
  let fixture: ComponentFixture<AddParkingComponent>;
  let authService: any;
  beforeEach(async () => {
    let authUser: UserDetails = {
      user:{
          tpk_email: "testemail",
          tpk_name: "test name", 
          tpk_photoUrl: "test photo",
          tpk_firebaseid: "testId"
        }
      }
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AddParkingComponent ],
      providers: [{ provide: AuthService, useValue: jasmine.createSpyObj(['registerUserToParker', 'loginUserToParker', 'getSignedInUser', 'getSignedInUser'])}],

    })
    .compileComponents();
    authService = TestBed.inject(AuthService)
    authService.getSignedInUser.and.returnValue(of(authUser))

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should not submit invalid form", ()=>{
    component.addParkingForm.patchValue({
      name: "test",
      address: "dummy address",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
      capacity: ""
    });
    expect(component.addParkingForm.valid).toBeFalsy();
    component.submitParking();
    expect(component.invalidForm).toBeTrue();
  });

  it("should submit valid form", ()=>{
    component.addParkingForm.patchValue({
      name: "test",
      address: "dummy address",
      startDate: new Date(),
      endDate: new Date(),
      description: "this is test description",
      area: "100",
      capacity: 3,
      price: 10
    });
    expect(component.addParkingForm.valid).toBeTruthy();
    component.submitParking();
    expect(component.invalidForm).toBeFalse();
  });

  it("Parking Location object constructed when address is filled in autocomplete", ()=>{
    let googleAdress : PlaceResult = {
      formatted_address: "200 University Ave W, Waterloo, ON N2L 3G1, Canada",
      address_components: [
        {
          "long_name": "Waterloo",
          "short_name": "Waterloo",
          "types": [
            "locality",
            "political"
          ]
        },
        {
          "long_name": "Canada",
          "short_name": "Canada",
          "types": [
            "country",
            "political"
          ]
        },
        {
          "long_name": "N2L 3G1",
          "short_name": "N2L 3G1",
          "types": [
            "postal_code"
          ]
        }
      ],
      name: 'University of Waterloo'
    }
    component.onAutocompleteSelected(googleAdress);
    let resultAddress: ParkingLocation= {
      type : "Feature",
      geometry: {
        type : "Point",
        coordinates: [13.404954, 52.520008],
      },
      
      properties: {
        address: "200 University Ave W, Waterloo, ON N2L 3G1, Canada",
        city: "Waterloo",
        country: "Canada",
        area_code: "N2L 3G1"
      }
    };
    expect(component.addressDetails).toEqual(resultAddress);
  });

});
