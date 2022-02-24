import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
}
