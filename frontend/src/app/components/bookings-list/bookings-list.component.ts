import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService} from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import {bookinglist} from '../../models/responses/bookinglist'
import { BookingService } from 'src/app/services';
import { UserDetails } from 'src/app/models/responses/user';

@Component(
  {
    selector: 'app-bookings-list',
    templateUrl: './bookings-list.component.html',
    styleUrls: ['./bookings-list.component.scss']
  }
)

export class BookingsListComponent implements OnInit{

  
  bookings : any;
  //bookings = bookinglist;
  public signedInUser:any;

  constructor(private bookingService: BookingService, private authService: AuthService) 
  {
    this.authService.getSignedInUser().subscribe(
      (data: UserDetails) => 
      {
        this.signedInUser = data.user.tpk_firebaseid;
      }
    );
  }

   ngOnInit(): void 
   {
    this.authService.getSignedInUser().subscribe(
      (data: UserDetails) => 
      {
        this.signedInUser = data.user.tpk_firebaseid;
        this.bookingService.getBookings(this.signedInUser).subscribe(data => 
          this.bookings = data);
      }
    );
     
    // this.http.get("").subscribe((data) => {
    //   console.log(data);
    //   this.bookings=data;
    // })

  }

}

