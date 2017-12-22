import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../../app.constants';
import {LocalStorage} from '../../app.localStorage';

@Injectable()
export class HistoryService {

  constructor(private  http: Http, private localStorage: LocalStorage) {
  }


  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-user-token', this.localStorage.getItem('token'));
  }

  getHistory(): Promise<any> {
    const headers = new Headers();
    this.createHeaders(headers);
    return this.http.get(AppConstants.serverUrl + '/history/' + this.localStorage.getItem('user_id'), {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: any): Promise<any> {
    console.log(error.message);
    return Promise.reject(error);
  }


}
