import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService, FirebaseService, PreLoaderService } from 'src/app/services';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dashboard_user: any;
  constructor(private actionSheetCtrl: ActionSheetController, 
              private firebaseService: FirebaseService,
              private parkerAuth: AuthService,
              private routerService: Router,
              private preloaderService:PreLoaderService
              ) 
              {
                this.preloaderService.presentLoader()
                this.parkerAuth.getSignedInUser().subscribe({
                  next: response => {
                    this.dashboard_user = response.user
                  },
                  error: (error) => {
                    this.preloaderService.dismissLoader()
                    console.log('get user failed in dashboard', error)
                    this.routerService.navigate(['/home'])
                  }
                })
              }

   /* istanbul ignore next */
  public async presentActionSheet() {
    console.log('inside action sheet',  this.firebaseService.authUser)
    const actionSheet = await this.actionSheetCtrl.create(environment.actionSheetConfig(this.firebaseService));
    console.log(actionSheet)
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

}
