import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class LocalStorage {

  setItem(key: any, val: any) {
    sessionStorage.setItem(key, val);

  }

  getItem(key: any) {

    return sessionStorage.getItem(key);

  }

  setObject(key: any, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));

  }

  getObject(key: any) {
    return sessionStorage.getItem(key);
  }

  removeItem(key: any) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }

}
