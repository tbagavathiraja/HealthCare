import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AppComponent} from './app.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AppComponent, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLoggedIn()) {
      console.log("RRRRRRR"+this.auth.isLogged)
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
