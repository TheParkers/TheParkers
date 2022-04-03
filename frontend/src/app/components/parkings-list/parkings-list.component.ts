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
  constructor(private parkingsService: ParkingsService ,private router:Router, private localStorageService: LocalStorageService) {
    this.lat = parseInt(this.localStorageService.getItem("lat") || "43.474");
    this.lng = parseInt(this.localStorageService.getItem("long") || "-80.5465");
    this.zoom = 8;
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
    if (this.parkingSpaces && this.parkingSpaces?.length > 0){
      this.lat = this.parkingSpaces[0].tpk_ps_location.geometry.coordinates[1]
      this.lng = this.parkingSpaces[0].tpk_ps_location.geometry.coordinates[0];
    }
    // private setCurrentPosition() {
    //   if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.lat = position.coords.latitude;
    //       this.lng = position.coords.longitude;
    //       this.zoom = 15;
    //     });
    //   }
    //this.setCurrentPosition();
  }

}
