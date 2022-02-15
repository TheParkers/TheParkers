import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FirebaseService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private firebase: FirebaseService, 
    private platform: Platform,
    private router: Router){
      
  }
  ngOnInit() {
    
  }
      
  login() {
    console.log(this.platform.platforms())
    if (!this.platform.is('capacitor'))
    {
      this.firebase.googlelogin().then(
        (success) => {
            this.router.navigate(['/dashboard'])
        },
        (error) => {
           console.error("Home Error: in log in login", error)
        }
       );
    }
    else {
      this.firebase.capacitorGoogleLogin().then(
        (success) => {
            console.log('hello', success)
            this.router.navigate(['/dashboard'])
        },
        (error) => {
          console.error("Home Error: in log in login", error)
       }
      );
    }
  }
  
  logout() {
    this.firebase.logout();
  }

}
