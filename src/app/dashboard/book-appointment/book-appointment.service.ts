import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../../app.constants';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from '../../app.localStorage';

@Injectable()
export class BookAppointmentService {

  constructor(private  http: Http, private localStorage: LocalStorage) {
  }

  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-user-token', this.localStorage.getItem('token'));
  }

  bookAppointment(users): Promise<any> {
    const headers = new Headers();
    this.createHeaders(headers);
    return this.http.post(AppConstants.serverUrl + '/bookappointment', users, {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error): Promise<any> {
    console.log(error.message);
    return Promise.reject(error);
  }
}
