import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class PreLoaderService {
  constructor( public loadingController: LoadingController) {
    
  }

  presentLoader() {
    this.loadingController.create({
        message: 'Loading...'
    }).then((response) => {
        response.present();
    });
  }
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
    }).catch((err) => {
        console.log('Error occured : ', err);
    });
}
}
