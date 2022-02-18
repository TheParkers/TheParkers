import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { AuthService } from '../auth/auth.service';
import { of, throwError } from 'rxjs';
import { FirebaseService } from '..';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
  }


  // async getuserbyidasync(id:any) {
  //     let user = this.firebaseService.getAuthUser
  //     if (user) 
  //     {
  //         const httpOptions = {
  //           headers: new HttpHeaders({
  //             'Content-Type':  'application/json',
  //           })
  //         }
  //         return this.http.get<any>(
  //                   environment.apiServer+environment.apiUrls.user.userbyid+user.tpk_firebaseid, 
  //                   httpOptions)
  //     }
  //     return of(throwError(() => new Error('User Service failed: unauthenticated parker access')))
  // } 
}
