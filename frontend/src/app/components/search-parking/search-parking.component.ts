import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.scss']
})
export class SearchParkingComponent implements OnInit {

  constructor() { }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  ngOnInit(): void {
  }

}
