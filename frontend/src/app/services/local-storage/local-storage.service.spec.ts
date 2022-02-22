import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test set Item get item in local storage', () => {
    let key = 'test'
    let value = 'valuetest'
    service.setItem(key, value);
    let returnValue = service.getItem(key)
    spyOn(service, 'setItem')
    expect(service).toBeTruthy();
    expect(returnValue).toEqual(value);
  });

  it('test remove item in local storage', () => {
    let key = 'test'
    let value = 'valuetest'
    service.setItem(key, value);
    service.removeItem(key)
    let returnValue = service.getItem(key)
    spyOn(service, 'setItem')
    expect(service).toBeTruthy();
    expect(returnValue).toBeFalsy();
  });

  it('test clear all items in local storage', () => {
    let key = 'test'
    let value = 'valuetest'
    let key2 = 'test2'
    let value2 = 'valuetest2'
    service.setItem(key, value);
    service.setItem(key2, value2);
    service.clearAll()
    let returnValue1 = service.getItem(key)
    let returnValue2 = service.getItem(key2)
    spyOn(service, 'setItem')
    expect(service).toBeTruthy();
    expect(returnValue1).toBeFalsy();
    expect(returnValue2).toBeFalsy();
  });
});
