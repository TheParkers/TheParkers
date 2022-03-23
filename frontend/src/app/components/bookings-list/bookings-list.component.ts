import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

import {bookinglist} from '../../models/responses/bookinglist'

@Component(
  {
    selector: 'app-bookings-list',
    templateUrl: './bookings-list.component.html',
    styleUrls: ['./bookings-list.component.scss']
  }
)

export class BookingsListComponent {

  
  bookings = bookinglist;

  constructor() 
  {
    
  }

  // ngOnInit(): void {
    
  //   // this.bookingService.getAppointments()
  //   //   .subscribe((bookings: bookinglist[]) => {
  //   //     this.bookings = bookings;
  //   //   },
  //   //   (error: ErrorEvent) => {
  //   //     this.errorMsg = error.error.message;
  //   //     this.loading = false;
  //   //   });
  // }

}
