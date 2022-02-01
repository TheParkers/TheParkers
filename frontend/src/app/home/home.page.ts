import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseService } from '../services/firebase/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  headerimageurl = '../../assets/images/desktop/logo.png'
  constructor(private platform: Platform, private firebase: FirebaseService) {
    
  }
  login() {
      this.firebase.login();
  }
  logout() {
    this.firebase.logout();
  }
}
