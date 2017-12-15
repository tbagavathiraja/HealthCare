import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {LocalStorage} from '../../app.localStorage';
import {AppConstants} from '../../app.constants';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AcknowledgeService {

  constructor(private http: Http) {
  }

  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }

  updatePassword(credentials): Promise<any> {
    const headers = new Headers();
    this.createHeaders(headers);
    return this.http.put(AppConstants.serverUrl + '/updatepassword', credentials, {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(err) {
    console.log(err);
    return Promise.reject(err);
  }

}
