import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from "../environments/environment.dev";
import { FirebaseService, GuardService } from './services'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { LANGUAGE_CODE } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchParkingComponent } from './components/search-parking/search-parking.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchParkingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: false } },
    { provide: LANGUAGE_CODE, useValue: 'fr' },
    FirebaseService, 
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
