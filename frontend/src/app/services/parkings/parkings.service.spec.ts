import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage/local-storage.service';

import { ParkingsService } from './parkings.service';

describe('ParkingsService', () => {
  let service: ParkingsService;
  let parkingList : Array<any>; 
  let mockLocalStorageService : any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingsService);
    mockLocalStorageService = TestBed.inject(LocalStorageService)
    parkingList = [{
      tpk_access_information: "test information",
      tpk_description: "test description",
      tpk_ps_name: "test name",
      tpk_parking_area: 100,
      tpk_ps_location: {
        geometry:{type: "point",coordinates: [0,0]},
        properties: {address: "address",area_code:"12345", city:"city", country:"country"},
        type: "point"
      },
      tpk_price_per_hour: 20,
      tpk_vehicle_capacity: 2,
      tpk_has_features: true,
      tpk_created_on: new Date(),
      tpk_parking_features:{
        tpk_has_car_charging: true,
        tpk_has_car_wash: false,
        tpk_has_indoor_parking: false
      },
      tpk_parkingspace_images: [{"tpk_base64_image":"image1"}, {"tpk_base64_image":'image2'}],
      tpk_user: {tpk_email:"test email", tpk_firebaseid: "firebase id", tpk_name:"name"}
    }]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("setParkings should set the set the parkingList value",() =>{
    expect(service).toBeTruthy();
    service.setParkings(parkingList);
    //expect(mockLocalStorageService.getItem('parkingsList')).toEqual(JSON.stringify(parkingList))
  });

  it("getParkings should retrieve the parking lists",()=>{
    expect(service).toBeTruthy();
    parkingList[0].tpk_created_on = (new Date()).toDateString();
    mockLocalStorageService.setItem("parkingsList",JSON.stringify(parkingList));
    let parkings = service.getParkings();
    //expect(parkings).toEqual(parkingList);
  });
});
