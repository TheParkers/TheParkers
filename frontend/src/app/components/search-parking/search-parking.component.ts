import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular-material-extensions/google-maps-autocomplete';
import {} from 'googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.scss']
})
export class SearchParkingComponent {

  constructor(private router:Router) { }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  navigateToParkingList(){
    this.router.navigateByUrl('/parkings');
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
  }
}
