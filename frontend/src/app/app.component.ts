import { Component } from '@angular/core';
import { FirebaseService } from './services';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private firebase: FirebaseService, private platform: Platform){};
      
  login() {
    console.log(this.platform.platforms())
    if (!this.platform.is('capacitor'))
    {
      this.firebase.googlelogin();
    }
    else {
      this.firebase.capacitorGoogleLogin();
    }
  }
  
  logout() {
    this.firebase.logout();
  }

}
