import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FirebaseService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private firebase: FirebaseService,
    private router: Router){
      
  }
      
  login() {
    this.firebase.login().then( (success) => {
        this.router.navigate(['/dashboard'])
        console.log('login user success from home')
    })
  }
  
  logout() {
    this.firebase.logout();
    this.router.navigate(['/home'])
  }

}
