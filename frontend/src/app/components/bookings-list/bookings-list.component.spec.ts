import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingService } from 'src/app/services';
import { BookingsListComponent } from './bookings-list.component';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserDetails } from 'src/app/models/responses/user';
import { AuthService } from 'src/app/services';
import { of } from 'rxjs';

describe('BookingsListComponent', () => 
  {
    let component: BookingsListComponent;
    let bookingservice: BookingService;
    let fixture: ComponentFixture<BookingsListComponent>;
    let authService: any;
    beforeEach(async () => 
      {
        let authUser: UserDetails = 
        {
          user:
          {
              tpk_email: "testemail",
              tpk_name: "test name", 
              tpk_photoUrl: "test photo",
              tpk_firebaseid: "testId"
            }
        }

        await TestBed.configureTestingModule(
          {
            imports: [
              HttpClientModule,
            ],
            declarations: [ BookingsListComponent ],
            providers: 
            [
              { 
                provide: AuthService, useValue: jasmine.createSpyObj(['registerUserToParker', 'loginUserToParker', 'getSignedInUser', 'getSignedInUser'])
              }
            ],
            // providers: [
            //   {provide: HttpClient, useValue: jasmine.createSpyObj(['get']) },
            //   BookingService
            // ]
          }
        )
        .compileComponents();
        authService = TestBed.inject(AuthService)
        authService.getSignedInUser.and.returnValue(of(authUser))
      }
    );

    beforeEach(() => 
      {
        bookingservice = TestBed.inject(BookingService);
        fixture = TestBed.createComponent(BookingsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }
    );

    it('should create', () => 
      {
        expect(component).toBeTruthy();
      }
    );

    it('should get parking', () => 
      {
        component.ngOnInit()
        expect(component).toBeTruthy();
      }
    );
    afterAll(() => {
      TestBed.resetTestingModule();
    });
  }
);
