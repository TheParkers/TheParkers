import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkersHeaderComponent } from './parkers-header.component';

describe('ParkersHeaderComponent', () => {
  let component: ParkersHeaderComponent;
  let fixture: ComponentFixture<ParkersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkersHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
