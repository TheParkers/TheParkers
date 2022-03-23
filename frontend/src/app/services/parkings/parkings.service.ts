import { Injectable } from '@angular/core';
import { ParkingSpace } from 'src/app/models/parking/parking.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingsService {

  constructor(private localStorageService: LocalStorageService) { }
  private parkingsList?: ParkingSpace[];

  setParkings(parkings: any){
    this.parkingsList = parkings;
    this.localStorageService.setItem("parkingsList", JSON.stringify(this.parkingsList));
  }

  getParkings(){
    if (this.localStorageService.getItem("parkingsList") != null){
      this.parkingsList = JSON.parse(this.localStorageService.getItem("parkingsList")||"");
    }
    return this.parkingsList;
  }
}
