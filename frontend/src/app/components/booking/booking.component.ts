import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent 
{
  @Input() 
  parkingSpace: any;
  @Input() 
  tpk_book_start_datetime: any;
  @Input() 
  tpk_book_end_datetime: any;


  constructor( private modalCtr: ModalController, public bookings: BookingService) {

  }
  

  async close() 
  {
    await this.modalCtr.dismiss();
  }
  booking() 
  {
    this.bookings.createBooking(
      this.parkingSpace.id,
      this.tpk_book_start_datetime,
      this.tpk_book_end_datetime
    );
    this.modalCtr.dismiss();
    alert("Booking Succesfull, Thanks!");
  }
  
}
