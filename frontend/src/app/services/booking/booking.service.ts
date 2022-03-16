import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { catchError, Observable, of } from 'rxjs';
import { bookingspace } from 'src/app/models/requests/bookingspace';
import { FirebaseService } from '../firebase/firebase.service';


@Injectable({
  providedIn: 'root'
})
export class BookingService{
  

  constructor(
    private http: HttpClient, 
    private firebaseobj: FirebaseService 
    ) 
    { }

  createBooking(tpk_parkingspaceId: any, tpk_book_start_datetime: any,tpk_book_end_datetime: any) {
    const samplebookingSpace: bookingspace = {
      "tpk_parkingspace": tpk_parkingspaceId,
      "tpk_book_start_datetime" :tpk_book_start_datetime,
      "tpk_book_end_datetime": tpk_book_end_datetime,
      "tpk_booking_user": {
      "tpk_firebaseid": "4"
        }
      }
      console.log(samplebookingSpace);
      this.http.post<bookingspace>(environment.apiServer+"/users/" +"4" +"/booking", samplebookingSpace).subscribe(  (data) => {
        console.log('booking', data);}
        )
    //.pipe(
      //catchError(this.handleError('Create booking', samplebookingSpace))
    //)
  }
  private handleError<T>(operation:any , result?: T) {
    return (error: any): Observable<any> => {
      console.error(operation,error);
      return of(error as T);
    };
  }
}