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
    private router: Router){
      
  }
  ngOnInit(): void {
    if(this.firebase.isAuthenticatedWithParker)
    {
      console.log('here')
      this.router.navigate(['/dashboard'])
    }
          
  }
      
  login() {
    this.firebase.login().then( () => {
        console.log('login user success from home')
    })
  }
  
  logout() {
    this.firebase.logout();
    this.router.navigate(['/home'])
  }

}
