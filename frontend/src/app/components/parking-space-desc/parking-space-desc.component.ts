import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-space-desc',
  templateUrl: './parking-space-desc.component.html',
  styleUrls: ['./parking-space-desc.component.scss']
})
export class ParkingSpaceDescComponent{

  @Input()
  parkingSpace: any = {};

  constructor() { }

}
