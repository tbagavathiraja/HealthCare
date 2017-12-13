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

  showDoctors() {
    this.http.get(AppConstants.serverUrl + '/showdoctors')
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
