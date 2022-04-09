import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services';
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

  constructor(public modalCtrl: ModalController, private router: Router, private localStorageService:LocalStorageService) { }

  async initModal(parkingSpace : any) {
    let routerState = this.router.getCurrentNavigation()?.extras?.state;
    let sDate = routerState?.['startDate'] || this.localStorageService.getItem("startDate");
    let startDate = new Date(parseInt(sDate)*1000);
    let eDate = routerState?.['endDate'] || this.localStorageService.getItem("endDate");
    let endDate = new Date(parseInt(eDate)*1000);
    const modal = await this.modalCtrl.create(
      {
        component: BookingComponent,
        componentProps: 
        {
          "parkingSpace": parkingSpace,
          "tpk_book_start_datetime" : startDate,
          "tpk_book_end_datetime" : endDate,
        },
        swipeToClose: true,
        presentingElement: await this.modalCtrl.getTop() 
      }
    );
    return await modal.present();
  }

}
