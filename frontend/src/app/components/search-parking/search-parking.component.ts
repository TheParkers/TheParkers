import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Location} from '@angular-material-extensions/google-maps-autocomplete';
import { environment } from "../../../environments/environment.dev";

import {} from 'googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { ParkingsService } from 'src/app/services/parkings/parkings.service';

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.scss']
})
export class SearchParkingComponent {
  private enteredLocality : string = "";
  constructor(private router:Router, private http: HttpClient , private parkingsService: ParkingsService) { }
  searchParkingForm = new FormGroup({
    city : new FormControl(),
    startDate : new FormControl(),
    endDate: new FormControl(),
  });
  

  onAutocompleteSelected(result: PlaceResult) {
    //console.log('onAutocompleteSelected: ', result);
    let enteredResult = result.address_components;
    if (enteredResult){
      for (const address of enteredResult){
        console.log(address);
        if (address['types'].indexOf("locality") != -1){
          this.enteredLocality = address.long_name;
          break;
        }
      }
    }
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
  }

  getParkings(){
    let startDate = Math.floor(Date.parse(this.searchParkingForm.value.startDate)/1000)
    let endDate = Math.floor(Date.parse(this.searchParkingForm.value.endDate)/1000)
    const getParkingsURL = environment.apiServer + "/parking?city__iexact="+this.enteredLocality+"&tpk_book_start_datetime="+ startDate +"&tpk_book_end_datetime=" + endDate;
    this.http.get(getParkingsURL).subscribe((data) => {
      console.log(data);
      this.parkingsService.setParkings(data);
      this.router.navigateByUrl('/parkings');
    })
  }
}
