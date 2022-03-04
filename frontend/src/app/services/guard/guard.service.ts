import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  public canActivate(): UrlTree|boolean 
    {
      if (this.firebaseService.isAuthenticatedWithParker)
      {
         return true
      }
      return this.router.parseUrl('/home');
    }
}
