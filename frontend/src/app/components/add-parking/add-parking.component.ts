import { Component, OnInit } from '@angular/core';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import {} from 'googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParkingLocation, ParkingSpace } from 'src/app/models/parking/parking.model';
import { AuthService} from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.dev";
import { UserDetails } from 'src/app/models/responses/user';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.scss']
})

export class AddParkingComponent implements OnInit {
  //@ViewChild("placesRef") placesRef : GooglePlaceDirective;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress?: PlaceResult;
  public images : string[] = [];
  public addressDetails!: ParkingLocation;
  public rating: number = 1;
  public signedInUser?: UserDetails;
  public invalidForm: boolean = false;
  addParkingForm = new FormGroup({
    name : new FormControl("",[Validators.required]),
    address : new FormControl("",[Validators.required]),
    price: new FormControl("",[Validators.required]),
    startDate: new FormControl("",[Validators.required]),
    endDate: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    accessInformation: new FormControl(""), 
    area: new FormControl("",[Validators.required]), 
    capacity: new FormControl("",[Validators.required]), 
    isChargingAvailable: new FormControl(),
    isWashingAvailable: new FormControl(),
    isIndoorParking: new FormControl(),
    photos: new FormControl()
  });
  constructor(private authService: AuthService, private http: HttpClient) {
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
    this.authService.getSignedInUser().subscribe((data: UserDetails) => {
      this.signedInUser = data;
    })
   }

  ngOnInit(): void {
    this.setCurrentPosition();
  }


  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    let country :string = "";
    let postal_code : string = "";
    let city : string = "";
    let enteredResult = result.address_components;
    if (enteredResult){
      this.rating = result.rating || 1;
      for (const address of enteredResult){
        //console.log(address);
        if (address['types'].indexOf("country") != -1){
          country = address.long_name;
        }
        if (address['types'].indexOf("postal_code") != -1){
          postal_code = address.long_name;
        }
        if (address['types'].indexOf("locality") != -1){
          city = address.long_name;
        }
  
      }
    }
    this.addressDetails = {
      type : "Feature",
      geometry: {
        type : "Point",
        coordinates: [this.longitude, this.latitude] 
      },
      
      properties: {
        address: result.formatted_address || "",
        city: city,
        country: country,
        area_code: postal_code
      }
    }

  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
  
  onFileChange(event: Event) {
    if (event && event.target){
      let files = (<HTMLInputElement>event.target).files;
      if (files && files[0]) {
        var filesAmount = files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                   //console.log(event.target.result);
                   this.images.push(event.target.result);
                }
                reader.readAsDataURL(files[i]);
        }
    }
    }

  }

  submitParking(){
    if (this.signedInUser && this.addParkingForm.valid){
      let parkingImages = [];
      for (var image of this.images){
        parkingImages.push({
          "tpk_base64_image": image
        });
      }
      let parking:ParkingSpace = {
        tpk_ps_name: this.addParkingForm.value.name,
        tpk_access_information : this.addParkingForm.value.accessInformation,
        tpk_created_on : new Date(),
        tpk_description: this.addParkingForm.value.description,
        tpk_parking_area: parseInt(this.addParkingForm.value.area),
        tpk_ps_location: this.addressDetails,
        tpk_has_features : true,
        tpk_parking_features: {
          tpk_has_car_charging : this.addParkingForm.value.isChargingAvailable || false,
          tpk_has_car_wash : this.addParkingForm.value.isWashingAvailable || false,
          tpk_has_indoor_parking: this.addParkingForm.value.isIndoorParking || false,
        },
        tpk_user: this.signedInUser.user,
        tpk_price_per_hour: parseFloat(this.addParkingForm.value.price),
        tpk_vehicle_capacity: parseInt(this.addParkingForm.value.capacity),
        tpk_rating: this.rating,
        tpk_last_booked: new Date(),
        tpk_parkingspace_images: parkingImages,
  
      };
      console.log(parking);
      this.http.post(environment.apiServer + environment.apiUrls.parking,parking).subscribe((data)=>{
        console.log(data);
      })
    } else if (this.addParkingForm.invalid){
      this.invalidForm = true;
    }
  }
}
