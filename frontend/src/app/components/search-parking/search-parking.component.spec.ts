import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParkingComponent } from './search-parking.component';

describe('SearchParkingComponent', () => {
  let component: SearchParkingComponent;
  let fixture: ComponentFixture<SearchParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchParkingComponent ]
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
