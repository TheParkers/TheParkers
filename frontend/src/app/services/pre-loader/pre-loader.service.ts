import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseService } from '..';

@Injectable({
  providedIn: 'root'
})

export class PreLoaderService {
  constructor(private loadingController: LoadingController, private firebaseService: FirebaseService) {}

  presentLoader() {
    this.loadingController.create({
        message: 'Loading...'
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
        this.firebaseService.clearAuthStates();
    });
}
}
