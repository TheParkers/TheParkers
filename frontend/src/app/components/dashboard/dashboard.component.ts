import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private actionSheetCtrl: ActionSheetController, 
              private firebaseService: FirebaseService,
              private userService: UserService 
              ) 
  {
  }

  ngOnInit() {
    this.userService.getuserbyemail(this.firebaseService.authUser?.tpk_email).subscribe({
      next: (user) => {
          console.log('User service call', user)
      },
      error: (error) => {
          console.log("Dashboard: Error in get user by id")
      }
    })
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
