import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-desc',
  templateUrl: './booking-desc.component.html',
  styleUrls: ['./booking-desc.component.scss']
})
export class BookingDescComponent implements OnInit {

  @Input()
  booking: any = {};

  constructor( ) { 
    
  }

  ngOnInit(): void {

  }

}
