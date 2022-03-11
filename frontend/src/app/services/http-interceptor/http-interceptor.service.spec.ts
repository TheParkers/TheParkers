import { TestBed } from '@angular/core/testing';
import { PreloaderComponent } from 'src/app/components/pre-loader/pre-loader.component';
import { HttpInterceptorService } from './http-interceptor.service';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PreloaderComponent
    ]});
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
