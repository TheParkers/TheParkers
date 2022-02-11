import { Component } from '@angular/core';
import { FirebaseService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  email = 'test@gmail.com'
  password = 's'
  constructor(private firebase: FirebaseService){};
      
  login() {
    this.firebase.login();
  }
  
  

  signUp() {
  
  //this.email = 'test@gmail.com';
  //this.password = 's';
  this.firebase.SignUp(this.email, this.password);
  
  }
  
  logout() {
    this.firebase.logout();
  }

}
