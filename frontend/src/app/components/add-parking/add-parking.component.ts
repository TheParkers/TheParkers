import { Component, OnInit } from '@angular/core';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import {} from 'googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

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
  constructor() {
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
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
                  console.log(event.target.result);
                   this.images.push(event.target.result); 
                }
                reader.readAsDataURL(files[i]);
        }
    }
    }

  }
}
