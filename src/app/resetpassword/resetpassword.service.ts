import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {LocalStorage} from '../app.localStorage';
import {AppConstants} from '../app.constants';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResetpasswordService {

  constructor(private http: Http, private localStorage: LocalStorage) {
  }

  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }

  resetPassword(credentials): Promise<any> {
    const headers = new Headers();
    this.createHeaders(headers);

    return this.http.post(AppConstants.serverUrl + '/resetpassword', credentials, {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error): Promise<any> {
    console.log(error);
    return Promise.reject(error);
  }

}
