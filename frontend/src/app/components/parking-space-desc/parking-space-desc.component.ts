import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-parking-space-desc',
  templateUrl: './parking-space-desc.component.html',
  styleUrls: ['./parking-space-desc.component.scss']
})
export class ParkingSpaceDescComponent{

  modalDataResponse: any;
  @Input()
  parkingSpace: any = {};

  constructor(public modalCtrl: ModalController) { }

  async initModal(parkingSpace : any) {
    const modal = await this.modalCtrl.create(
      {
        component: BookingComponent,
        componentProps: 
        {
          "parkingSpace": parkingSpace,
          "tpk_book_start_datetime" : new Date(),
          "tpk_book_end_datetime" : new Date(),
        },
        swipeToClose: true,
        presentingElement: await this.modalCtrl.getTop() 
      }
    );

     

    return await modal.present();
  }

}
