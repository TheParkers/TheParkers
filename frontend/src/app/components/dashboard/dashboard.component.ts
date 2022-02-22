import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController, 
              private firebaseService: FirebaseService
              ) {}

  ngOnInit() {
  }

   /* istanbul ignore next */
  public async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create(environment.actionSheetConfig(this.firebaseService));
    console.log(actionSheet)
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

}
