import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router';
import {LocalStorage} from '../app.localStorage';
import {DashboardComponent} from './dashboard.component';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private localStorage: LocalStorage , public auth: DashboardComponent, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLoggedIn()) {
      this.auth.showIncludes = false;
      this.auth.dashboardClick = false;
      this.localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    } else {
    }
    return true;
  }

}
