import { Component } from '@angular/core';
import { FirebaseService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(private firebase: FirebaseService){};
  email: string;
  password: string;
  
  login() {
    this.firebase.login();
  }
  logout() {
    this.firebase.logout();
  }
  passwordResetEmail(){
    this.email = 'test@gmail.com';
    this.firebase.passwordResetEmail(this.email);
    
  }
}
