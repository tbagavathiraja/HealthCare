import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {LocalStorage} from '../../app.localStorage';
import {AppConstants} from '../../app.constants';
import {Response} from '@angular/http';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class LoginService {

  function;

  constructor(private http: Http, private localStorage: LocalStorage) {
  }

  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-user-token', this.localStorage.getItem('token'));
  }

  authenticate(credentials) {
    const headers = new Headers();
    this.createHeaders(headers);
    this.http.post(AppConstants.serverUrl + '/authenticate', credentials, {headers: headers})
      .toPromise().then(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    return res.json();
  }

  handleError(error: any) {

    return Promise.reject(error.message);
  }


}
