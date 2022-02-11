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
 
  login() {
    this.firebase.login();
  }
  email: string;
  password: string;
  

  signUp() {
  
  this.email = 'test@gmail.com';
  this.password = 's';
  this.firebase.SignUp(this.email, this.password);
  
  }
  signIn() {
 
    this.email = 'test@gmail.com';
    this.password = '';
    this.firebase.SignIn(this.email, this.password);
    }

  
  passwordResetEmail(){
    this.email = 'test@gmail.com';
    this.firebase.passwordResetEmail(this.email);
    
  }
  
  logout() {
    this.firebase.logout();
  }

}
