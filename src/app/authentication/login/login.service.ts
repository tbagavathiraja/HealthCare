import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {LocalStorage} from '../../app.localStorage';
import {AppConstants} from '../../app.constants';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class LoginService {

  constructor(private http: Http, private localStorage: LocalStorage) {
  }

  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-user-token', this.localStorage.getItem('token'));
  }

  authenticate(credentials): Promise<any> {
    const headers = new Headers();
    this.createHeaders(headers);
    return this.http
      .post(AppConstants.serverUrl + '/authenticate', credentials, {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    // console.log('extracting  ' + JSON.stringify(res));
    return res.json();
  }


  private handleError(error: any): Promise<any> {
    console.log(error.message);
    return Promise.reject(error.message);
  }


}
