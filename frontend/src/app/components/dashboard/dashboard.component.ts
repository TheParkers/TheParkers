import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit(): void {
    console.log('dashboard')
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      translucent: false,
      buttons: [{
        text: 'Bookings',
        role: 'bookings',
        icon: 'cart-outline',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Bookings clicked');
        }
      }, {
        text: 'Rentals',
        icon: 'car-sport-outline',
        data: 10,
        handler: () => {
          console.log('Rentals clicked');
        }
      }, {
        text: 'Profile',
        icon: 'person-circle-outline',
        data: 'Data value',
        handler: () => {
          console.log('Profile clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

}
