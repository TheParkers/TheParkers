import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private firebase: FirebaseService) {

  }

  login() {
      this.firebase.login();
  }

  logout() {
    this.firebase.logout();
}

}
