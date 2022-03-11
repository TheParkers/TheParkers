import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddParkingComponent } from './components/add-parking/add-parking.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ParkingsListComponent } from './components/parkings-list/parkings-list.component';
import { GuardService } from './services';

const routes: Routes = [
  // Home urls
  {
    path: '',
    component: AppComponent,
    children: [
      // Home Url
      {
        path: 'home',
        component: HomeComponent
      },
      // Dashboard urls
      {
        path: '',
        component: DashboardComponent,
        canActivate: [GuardService],
      },
      {
        path: 'addParking',
        component: AddParkingComponent,
        //canActivate: [GuardService],
      },
      // Parking space Urls
      {
        path: 'parkings', // child route path
        component: ParkingsListComponent,
        //canActivate: [GuardService],
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
