import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from "../environments/environment.dev";
import { FirebaseService } from './services/firebase/firebase.service';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { LANGUAGE_CODE } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: false } },
              { provide: LANGUAGE_CODE, useValue: 'fr' },
              FirebaseService
            ],
  bootstrap: [AppComponent],
})
export class AppModule {}
