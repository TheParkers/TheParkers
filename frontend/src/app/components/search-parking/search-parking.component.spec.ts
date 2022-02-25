import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SearchParkingComponent } from './search-parking.component';

describe('SearchParkingComponent', () => {
  let component: SearchParkingComponent;
  let fixture: ComponentFixture<SearchParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchParkingComponent ],
      providers: [{ provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
