import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ParkingsListComponent } from './components/parkings-list/parkings-list.component';
import { GuardService } from './services';

const routes: Routes = [
  // Home urls
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
    children: [
      {
        path: '', // child route path
        component: DashboardComponent,
        canActivate: [GuardService],
      },
    ]
    
  },
  // Dashboard urls
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardService],
    pathMatch: 'full'
  },
  // Home Url
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  // Parking space Urls
  {
    path: 'parkings', // child route path
    component: ParkingsListComponent,
    //canActivate: [GuardService],
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
