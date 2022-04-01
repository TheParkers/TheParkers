import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { catchError, Observable, of } from 'rxjs';
import { bookings } from 'src/app/models/booking/booking.model';
import { bookingspace } from 'src/app/models/requests/bookingspace';


@Injectable({
  providedIn: 'root'
})

export class BookingService
{
  

  constructor(
    private http: HttpClient, 
    ) 
    { }

  createBooking(tpk_parkingspaceId: any, tpk_book_start_datetime: any,tpk_book_end_datetime: any, signedInUser: string) 
  {
    const samplebookingSpace: bookingspace = {
      "tpk_parkingspace": tpk_parkingspaceId,
      "tpk_book_start_datetime" :tpk_book_start_datetime,
      "tpk_book_end_datetime": tpk_book_end_datetime,
      "tpk_booking_user": 
        {
          "tpk_firebaseid": signedInUser
        }
      }
      this.http.post(environment.apiServer+environment.apiUrls.createBooking1 +signedInUser + environment.apiUrls.createBooking2, samplebookingSpace).
      subscribe((data)=>
        {
          alert("Booking Successfull, Thanks!")
          console.log("Booking Successfull", data)
        }
      )
      
  }
  getBookings(tpk_firebaseid: string): Observable<bookings[]> 
  {
    //console.log("Getbooking service:" , tpk_firebaseid)
    //console.log(environment.apiServer+ environment.apiUrls.getbooking1 + tpk_firebaseid +environment.apiUrls.getbooking2)
    return this.http.get<bookings[]>(environment.apiServer+ environment.apiUrls.getbooking1 + tpk_firebaseid +environment.apiUrls.getbooking2);
  }
}
