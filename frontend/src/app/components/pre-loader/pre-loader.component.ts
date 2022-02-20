import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pre-loader',
  //templateUrl: '',
  styleUrls: ['./pre-loader.component.scss']
})
export class PreloaderComponent{
  loading : any
  constructor(public loadingController: LoadingController) {
      
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1500
    });
    await this.loading.present();
  }
  async hideLoading() {
    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}