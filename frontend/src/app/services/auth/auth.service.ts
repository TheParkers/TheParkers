import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment.dev";
import { catchError, Observable, of } from 'rxjs';
import { FirebaseToken , ParkerSinginResponse} from '../../models';
import { UserDetails } from 'src/app/models/responses/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUserToParker(token: string, userid: string): Observable<any> {
    const requestObj: FirebaseToken = {
      "tpk_firebaseid": token
    }
    return this.http.put<FirebaseToken>(environment.apiServer+environment.apiUrls.registerUser+userid, requestObj)
    .pipe(
      catchError(this.handleError('Register user to parker', requestObj))
    )
  }
  loginUserToParker(token: string): Observable<ParkerSinginResponse> {
    const requestObj: FirebaseToken = {
      "tpk_firebaseid": token
    }
    return this.http.post<FirebaseToken>(environment.apiServer+environment.apiUrls.loginUser, requestObj)
    .pipe(
      catchError(this.handleError('Login user to parker', requestObj))
    )
  }

  getSignedInUser(): Observable<UserDetails> {
    return this.http.get<UserDetails>(environment.apiServer+environment.apiUrls.user.userDetails);
  }

  private handleError<T>(operation:any , result?: T) {
    return (error: any): Observable<any> => {
      console.error(operation,error);
      return of(error as T);
    };
  }

}
