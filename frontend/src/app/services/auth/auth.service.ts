import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment.dev";
import { catchError, Observable, of } from 'rxjs';
import { FirebaseToken } from '../models/requests/firebasetoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUserToParker(token: string, userid: string): Observable<any> {
    const requestObj: FirebaseToken = {
      "tpk_firebaseid": token
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    }
    return this.http.put<FirebaseToken>(environment.apiUrls.registerUser+userid, requestObj, httpOptions)
    .pipe(
      catchError(this.handleError('Register user to parker', requestObj))
    )
  }
  loginUserToParker(token: string, userid: string): Observable<any> {
    const requestObj: FirebaseToken = {
      "tpk_firebaseid": token
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    }
    return this.http.post<FirebaseToken>(environment.apiUrls.loginUser+userid, requestObj, httpOptions)
    .pipe(
      catchError(this.handleError('Login user to parker', requestObj))
    )
  }

  private handleError<T>(operation:any , result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation,error);
      return of(result as T);
    };
  }

}
