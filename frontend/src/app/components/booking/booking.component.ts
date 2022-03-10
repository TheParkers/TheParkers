import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  constructor(public bookings: BookingService ) {
    

  }
 
  booking() {
    this.bookings.booking().then( () => {
        console.log('booking success from app')
    })
  }
}
