import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { catchError, Observable, of } from 'rxjs';
import { bookingspaceDetails } from 'src/app/models/requests;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(token: string, userid: string): Observable<any> {
    const requestObj: bookingspaceDetails = {
      "tpk_parkingspace": number;
      "tpk_book_start_datetime" : Date
      "tpk_book_end_datetime": Date
      "tpk_firebaseid": string
      }
    return this.http.put<bookingspaceDetails>(environment.apiServer+environment.apiUrls.bookingspace+userid, requestObj)
    .pipe(
      catchError(this.handleError('Register user to parker', requestObj))
    )
  }
  private handleError<T>(operation:any , result?: T) {
    return (error: any): Observable<any> => {
      console.error(operation,error);
      return of(error as T);
    };
  }
}
