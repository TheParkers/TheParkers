import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pre-loader',
 // templateUrl: 'loading-example.html',
  styleUrls: ['./pre-loader.component.scss']
})
export class PreloaderComponent{
  constructor(public loadingController: LoadingController) {
      const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1500
    });
  }

  async presentLoading() {
    
    await loading.present();

   
  }
  async function hideLoading() {
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}