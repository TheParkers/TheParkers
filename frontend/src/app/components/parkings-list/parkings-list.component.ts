import { Component, OnInit } from '@angular/core';
import {spaces} from  '../../models/dummy-data/parking-spaces';
import {} from 'googlemaps';

@Component({
  selector: 'app-parkings-list',
  templateUrl: './parkings-list.component.html',
  styleUrls: ['./parkings-list.component.scss']
})
export class ParkingsListComponent{

  parkingSpaces = spaces;
  lat = 43.474;
  lng = -80.5465;
  zoom: number = 15;
  constructor() {}
}
