import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageServiceProvider {

  constructor(public http: HttpClient) {
    
  }
  write(key: string, value: any) {
    if (value) {
      localStorage.setItem(key, value);
    }
    
  }

  read(key: string): string {
    let value: string = localStorage.getItem(key);

    if (value && value != "undefined" && value != "null") {
      return value;
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
