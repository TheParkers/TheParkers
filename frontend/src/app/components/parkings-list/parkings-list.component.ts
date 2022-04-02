import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ParkingsService } from 'src/app/services/parkings/parkings.service';
import { ParkingSpace } from 'src/app/models/parking/parking.model';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services';

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
  public startDate! : string;
  public endDate!: string;
  public city!: string;

  constructor(private parkingsService: ParkingsService, private router:Router, private localStorageService: LocalStorageService) {
    this.lat = 43.474;
    this.lng = -80.5465;
    this.zoom = 12;
    let routerState = this.router.getCurrentNavigation()?.extras?.state;
    let sDate = routerState?.['startDate'] || this.localStorageService.getItem("startDate") || '';
    this.startDate = new Date(parseInt(sDate)*1000).toLocaleDateString("en-US");
    let eDate = routerState?.['endDate'] || this.localStorageService.getItem("endDate") || '';
    this.endDate = new Date(parseInt(eDate)*1000).toLocaleDateString("en-US");
    this.city = routerState?.['city'] || this.localStorageService.getItem("city");
    // console.log(this.startDate);
    // console.log(this.endDate);
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
