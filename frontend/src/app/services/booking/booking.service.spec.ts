import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { of, throwError } from 'rxjs';
import {BookingService} from './booking.service';




describe('BookingService', () => {
  let service: BookingService;
  let http: any;
;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        HttpClientModule,
      ],
      providers: [
        {provide: HttpClient, useValue: jasmine.createSpyObj(['post'])},
        BookingService,
      ]
    });
    service = TestBed.inject(BookingService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test createBooking success', () => {
    expect(service).toBeTruthy();
    let tpk_parkingspace = 2
    let tpk_book_start_datetime = 31
    let tpk_book_end_datetime = 31
    http.post.and.returnValue(of({}))
    service.createBooking(
      tpk_parkingspace, 
      tpk_book_start_datetime, 
      tpk_book_end_datetime
    )
  });

  it('test creatBooking failure', () => {
    
    let tpk_parkingspace = "2"
    let tpk_book_start_datetime = 31
    let tpk_book_end_datetime = 31
    let errorResponse: any
    expect(service).toBeTruthy();
    http.post.and.returnValue(throwError(() => errorResponse))
    let response = service.createBooking(
      tpk_parkingspace, 
      tpk_book_start_datetime, 
      tpk_book_end_datetime )
  });
});
