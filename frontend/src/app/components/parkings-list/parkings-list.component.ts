import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ParkingsService } from 'src/app/services/parkings/parkings.service';
import { ParkingSpace } from 'src/app/models/parking/parking.model';

@Component({
  selector: 'app-parkings-list',
  templateUrl: './parkings-list.component.html',
  styleUrls: ['./parkings-list.component.scss']
})
export class ParkingsListComponent implements OnInit{

  public parkingSpaces? : ParkingSpace[];
  public zoom: number;
  public lat: number;
  public lng: number;

  constructor(private parkingsService: ParkingsService) {
    this.lat = 43.474;
    this.lng = -80.5465;
    this.zoom = 12;
  }
  ngOnInit(): void {
    this.parkingSpaces = this.parkingsService.getParkings();
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
