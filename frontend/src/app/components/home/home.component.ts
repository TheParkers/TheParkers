import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public firebase: FirebaseService){
      
  }
      
  login() {
    this.firebase.login().then( () => {
        console.log('login user success from home')
    })
  }
}
