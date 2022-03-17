import { TestBed } from '@angular/core/testing';

import { ParkingsService } from './parkings.service';

describe('ParkingsService', () => {
  let service: ParkingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
