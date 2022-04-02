import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { ParkingsListComponent } from './parkings-list.component';

describe('ParkingsListComponent', () => {
  let component: ParkingsListComponent;
  let fixture: ComponentFixture<ParkingsListComponent>;
  class RouterStub{
    getCurrentNavigation(){
      return {
         extras: {
            state:{
              startDate: '32432535344353',
              endDate: '563646476577'
            }
          }
        }
      }
   }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ParkingsListComponent 
      ],
      providers: [{ provide: Router, useClass:RouterStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select', () => {
    component.ngOnInit()
  });
});
