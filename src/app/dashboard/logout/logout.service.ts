import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../../app.constants';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from '../../app.localStorage';
import {DashboardComponent} from '../dashboard.component';
import {Router} from '@angular/router';
@Injectable()
export class LogoutService {
  constructor(private  http: Http, private localStorage: LocalStorage , private router: Router , private dashboardComponent: DashboardComponent) {
  }


  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-user-token', this.localStorage.getItem('token'));
  }

  logoutUser(){

    console.log('Logging outtt...');

    this.logout()
      .then((response) => {

        console.log('Loggin out..');
        this.dashboardComponent.showIncludes = false;
        this.dashboardComponent.dashboardClick = false;
        this.dashboardComponent.isLogged = false;
        this.localStorage.clear();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });


  }

  logout(): Promise<any> {
    const headers = new Headers();
    this.createHeaders(headers);
    return this.http
      .delete(AppConstants.serverUrl + '/logout', {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res;
  }

  private handleError(error): Promise<any> {
    console.log(error.message);
    return Promise.reject(error);
  }

}
