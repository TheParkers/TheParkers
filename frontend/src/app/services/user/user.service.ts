import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs';
import { User } from 'src/app/models';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  
  getuserbyemail(id:any): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      withCredentials: true
    }
    return this.http.get<User>(
                    environment.apiServer+environment.apiUrls.user.userbyid+id, 
                    httpOptions)
  } 
}
