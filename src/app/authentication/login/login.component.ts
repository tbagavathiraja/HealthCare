import {Component, OnInit} from '@angular/core';
import {Utility} from '../../app.utility';
import {AppConstants, ErrorConstants} from '../../app.constants';
import {LoginService} from './login.service';
import {LocalStorage} from '../../app.localStorage';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    username: '',
    password: ''
  };
  errMessage = '';

  constructor(private appComponent: AppComponent, private router: Router, private utility: Utility, private loginService: LoginService, private localStorage: LocalStorage) {
  }

  ngOnInit() {
  }


  login() {

    if (!this.utility.emailValidate(this.credentials.username)) {
      this.errMessage = ErrorConstants.emailError;
    } else if (this.utility.validatePassword(this.credentials.password)) {
      this.errMessage = '';
      this.loginService.authenticate(this.credentials)
        .then((response) => {
          if (response.status === AppConstants.successStatus) {
            this.localStorage.clear();
            console.log(response)

            this.localStorage.setItem('token', response.session_auth_token);
            this.localStorage.setItem('role', response.role_type_name);
            this.appComponent.showIncludes = true;
            if (response.role_type_name === 'admin') {
              this.router.navigate(['/dashboard']);
            }
          } else {
            this.errMessage = ErrorConstants.loginError;
          }

        }).catch((error) => {
        console.log(error);
      });
    } else {
      this.errMessage = ErrorConstants.passwordError;
    }
  }

}
