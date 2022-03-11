import { TestBed } from '@angular/core/testing';

import { PreLoaderService } from './pre-loader.service';

describe('PreLoaderService', () => {
  let service: PreLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
