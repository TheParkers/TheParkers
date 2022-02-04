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
  logout() {
    this.firebase.logout();
  }
}
