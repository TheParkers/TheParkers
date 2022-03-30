import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { catchError, Observable, of } from 'rxjs';
import { bookingspace } from 'src/app/models/requests/bookingspace';


@Injectable({
  providedIn: 'root'
})

export class BookingService{
  

  constructor(
    private http: HttpClient, 
    ) 
    { }

  createBooking(tpk_parkingspaceId: any, tpk_book_start_datetime: any,tpk_book_end_datetime: any) {
    const samplebookingSpace: bookingspace = {
      "tpk_parkingspace": tpk_parkingspaceId,
      "tpk_book_start_datetime" :tpk_book_start_datetime,
      "tpk_book_end_datetime": tpk_book_end_datetime,
      "tpk_booking_user": 
        {
          "tpk_firebaseid": "4"
        }
      }
      this.http.post(environment.apiServer+"/users/" +"4" +"/booking", samplebookingSpace).
      subscribe((data)=>
        {
          alert("Booking Successfull, Thanks!")
          console.log("Booking Successfull", data)
        }
      )
      
  }
 }
