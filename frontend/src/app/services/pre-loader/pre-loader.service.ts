import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class PreLoaderService {
  constructor(private loadingController: LoadingController) {}

  presentLoader() {
    this.loadingController.create({
        message: 'Loading...',
        duration: 200
    }).then((response) => {
        response.present().then( ()=> {
            console.log('Preloader loaded successfully')
        });
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
