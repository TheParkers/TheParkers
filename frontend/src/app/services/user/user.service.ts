import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs';
import { User } from 'src/app/models';
import { FirebaseService } from '..';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  
  getuserbyemail(id:any): Observable<User> {
    return this.http.get<User>(
                    environment.apiServer+environment.apiUrls.user.userbyid+id)
  } 
}
