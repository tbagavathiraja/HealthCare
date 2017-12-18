import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AppConstants} from '../../app.constants';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from '../../app.localStorage';
import {AppComponent} from '../../app.component';
import {Router} from '@angular/router';
@Injectable()
export class LogoutService {
  constructor(private  http: Http, private localStorage: LocalStorage , private router: Router , private appComponent: AppComponent) {
  }


  createHeaders(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('x-user-token', this.localStorage.getItem('token'));
  }

  logoutUser(){

    console.log('Logging outtt...');
    console.log(this.router.url)
    this.logout()
      .then((response) => {

        console.log('Loggin out..');
        this.appComponent.showIncludes = false;
        this.appComponent.dashboardClick = false;
        this.appComponent.isLogged = false;
        this.localStorage.removeItem('token')
        console.log(this.appComponent.showIncludes)
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
