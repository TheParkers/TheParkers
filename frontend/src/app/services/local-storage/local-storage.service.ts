import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(item: string){
    return localStorage.getItem(item)
  }

  setItem(key: string, value: string){
    return localStorage.setItem(key, value)
  }

  removeItem(key: string){
    localStorage.removeItem(key)
  }

  clearAll(){
    localStorage.clear()
  }

}
