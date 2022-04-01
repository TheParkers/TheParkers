import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserDetails } from 'src/app/models/responses/user';
import { AuthService} from 'src/app/services';

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
  public signedInUser:any;


  constructor( private modalCtr: ModalController, public bookings: BookingService, private authService: AuthService) 
  {
    this.authService.getSignedInUser().subscribe
    (
      (data: UserDetails) => 
      {
        this.signedInUser = data.user.tpk_firebaseid;
      }
    );
  }
  

  async close() 
  {
    await this.modalCtr.dismiss();
  }
  booking() 
  {
    this.bookings.createBooking
    (
      this.parkingSpace.id,
      this.tpk_book_start_datetime,
      this.tpk_book_end_datetime,
      this.signedInUser
    )
    this.modalCtr.dismiss();
  }
  
}
