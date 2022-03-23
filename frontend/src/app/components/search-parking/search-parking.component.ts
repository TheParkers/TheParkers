import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public invalidForm: boolean = false;
  constructor(private router:Router, private http: HttpClient , private parkingsService: ParkingsService) { }
  searchParkingForm = new FormGroup({
    city : new FormControl("",[Validators.required]),
    startDate : new FormControl("",[Validators.required]),
    endDate: new FormControl("",[Validators.required]),
  });
  

  onAutocompleteSelected(result: PlaceResult) {
    //console.log('onAutocompleteSelected: ', result);
    let enteredResult = result.address_components;
    if (enteredResult){
      for (const address of enteredResult){
        //console.log(address);
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
    if (this.searchParkingForm.valid){
      let startDate = Math.floor(Date.parse(this.searchParkingForm.value.startDate)/1000)
      let endDate = Math.floor(Date.parse(this.searchParkingForm.value.endDate)/1000)
      const getParkingsURL = environment.apiServer + environment.apiUrls.parking + "?tpk_ps_location__city__iexact="+this.enteredLocality+"&tpk_book_start_datetime="+ startDate +"&tpk_book_end_datetime=" + endDate;
      this.http.get(getParkingsURL).subscribe((data) => {
        console.log(data);
        this.parkingsService.setParkings(data);
        this.router.navigateByUrl('/parkings');
      })
    } else{
      this.invalidForm = true;
    }
  }
}
