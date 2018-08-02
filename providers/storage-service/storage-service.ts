import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageServiceProvider {

  constructor(public http: HttpClient) {
    
  }
  write(key: string, value: any) {
    if (value) {
      if(typeof value =="object"){
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    }
    
  }

  read(key: string): string {
    let value: string = localStorage.getItem(key);

    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    }
    return "";
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}
