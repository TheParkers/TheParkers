import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { LocalStorageModel } from 'src/app/models';
import { environment } from 'src/environments/environment.dev';
import { LocalStorageService } from '..';
import { PreLoaderService } from '..';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService, public preLoaderService: PreLoaderService) { 
    this.localStorageService = localStorageService
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.preLoaderService.presentLoader()

    const jwtToken = this.localStorageService.getItem(LocalStorageModel.autheticationToken);
    const isParkersUrl = request.url.startsWith(environment.apiServer);
    if (jwtToken && isParkersUrl) {
        request = request.clone({
            setHeaders: { Authorization: "Bearer "+ jwtToken }
        });
    }
    request = request.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });
    return next.handle(request).pipe(
            finalize(() => this.preLoaderService.dismissLoader())
        );
  }
}
