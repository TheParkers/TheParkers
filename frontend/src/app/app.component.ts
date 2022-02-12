import { Component } from '@angular/core';
import { FirebaseService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private firebase: FirebaseService){};
      
  login() {
    this.firebase.googlelogin();
  }
  
  logout() {
    this.firebase.logout();
  }

}
