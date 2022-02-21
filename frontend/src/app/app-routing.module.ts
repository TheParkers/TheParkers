import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { GuardService } from './services';

const routes: Routes = [
  // Home urls
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    children: [
      {
        path: 'dashboard', // child route path
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
