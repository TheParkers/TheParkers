import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SearchParkingComponent } from './search-parking.component';

describe('SearchParkingComponent', () => {
  let component: SearchParkingComponent;
  let fixture: ComponentFixture<SearchParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
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

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it("should not submit invalid form", ()=>{
    let city = component.searchParkingForm.controls['city'];
    let startDate = component.searchParkingForm.controls['startDate'];
    let endDate = component.searchParkingForm.controls['endDate'];
    city.setValue("test");
    startDate.setValue("");
    endDate.setValue("");
    expect(component.searchParkingForm.valid).toBeFalsy();
    component.getParkings();
    expect(component.invalidForm).toBeTrue();
  });

  it("should submit valid form", ()=>{
    let city = component.searchParkingForm.controls['city'];
    let startDate = component.searchParkingForm.controls['startDate'];
    let endDate = component.searchParkingForm.controls['endDate'];
    city.setValue("test");
    startDate.setValue(new Date());
    endDate.setValue(new Date());
    expect(component.searchParkingForm.valid).toBeTruthy();
    component.getParkings();
    expect(component.invalidForm).toBeFalse();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
