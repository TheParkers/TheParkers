import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
      @Input() tpk_parkingspace: any;
      @Input() tpk_book_start_datetime: any;
      @Input() tpk_book_end_datetime: any;
      @Input() tpk_firebaseid: any;


  constructor( private modalCtr: ModalController, public bookings: BookingService) {
  }
  

  async close() {
    await this.modalCtr.dismiss();
  }
  booking() {
    this.bookings.createBooking(this.tpk_parkingspace,
      this.tpk_book_start_datetime,
      this.tpk_book_end_datetime,
      this.tpk_firebaseid);
      this.modalCtr.dismiss("Booking Successfull");
  }
  
}
