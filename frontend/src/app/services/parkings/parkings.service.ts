import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParkingsService {

  constructor() { }
  private parkingsList = []

  setParkings(parkings: any){
    this.parkingsList = parkings
  }

  getParkings(){
    return this.parkingsList;
  }
}
