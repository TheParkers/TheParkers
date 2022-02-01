import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../services/guard/guard.service';
import { HomePage } from './home.page';

const routes: Routes = [
  { path: '**', component:  HomePage},
  {
    path: '',
    component: HomePage,
    canActivate: [GuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
