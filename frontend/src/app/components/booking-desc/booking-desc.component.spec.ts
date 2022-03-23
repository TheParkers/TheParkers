import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bookinglist } from 'src/app/models/responses/bookinglist';
import { BookingDescComponent } from './booking-desc.component';

describe('BookingDescComponent', () => 
  {
    let component: BookingDescComponent;
    let fixture: ComponentFixture<BookingDescComponent>;

    beforeEach(async () => 
      {
        await TestBed.configureTestingModule(
        {
          declarations: [ BookingDescComponent ],
          imports: 
          [
            MatIconModule, 
            MatExpansionModule, 
            BrowserAnimationsModule
          ]

        })
        .compileComponents();
      }
    );

    beforeEach(() => 
      {
        fixture = TestBed.createComponent(BookingDescComponent);
        component = fixture.componentInstance;
        component.booking = bookinglist[0]
        fixture.detectChanges();
      }
    );

    it('should create', () => 
      {
        expect(component).toBeTruthy();
      }
    );
  }
);
