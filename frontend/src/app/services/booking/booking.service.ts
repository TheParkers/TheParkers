import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { catchError, Observable, of } from 'rxjs';
import { bookingspaceDetails } from 'src/app/models/requests';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(): Observable<any> {
    const samplebookingSpace: bookingspaceDetails = {
      "tpk_parkingspace": 2,
      "tpk_book_start_datetime" : 31,
      "tpk_book_end_datetime": 31,
      "tpk_firebaseid": 4
      }
    return this.http.post<bookingspaceDetails>(environment.apiServer+environment.apiUrls.bookingspace, samplebookingSpace)
    .pipe(
      catchError(this.handleError('Create booking', samplebookingSpace))
    )
  }
  private handleError<T>(operation:any , result?: T) {
    return (error: any): Observable<any> => {
      console.error(operation,error);
      return of(error as T);
    };
  }
}
