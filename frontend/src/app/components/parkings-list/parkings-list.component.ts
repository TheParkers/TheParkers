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
  public zoom: number;
  public lat: number;
  public lng: number;

  constructor() {
    this.lat = 43.474;
    this.lng = -80.5465;
    this.zoom = 12;
  }
  ngOnInit(): void {
    this.setCurrentPosition();
  }
  
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

}
