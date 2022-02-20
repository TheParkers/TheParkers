import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { LocalStorageModel } from 'src/app/models';
import { environment } from 'src/environments/environment.dev';
import { LocalStorageService } from '..';
import { PreloaderService } from '..';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService, preloaderService: PreloaderService) { 
    this.localStorageService = localStorageService
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.preloaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.preloaderService.hide())
        );
    const jwtToken = this.localStorageService.getItem(LocalStorageModel.autheticationToken);
    const isParkersUrl = request.url.startsWith(environment.apiServer);
    if (jwtToken && isParkersUrl) {
        request = request.clone({
            setHeaders: { Authorization: "Bearer "+ jwtToken }
        });
    }

    return next.handle(request).pipe(
            finalize(() => this.preloaderService.hide())
        );
  }
}
