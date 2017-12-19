import {Component, OnInit} from '@angular/core';
import {Utility} from '../../app.utility';
import {AppConstants, ErrorConstants} from '../../app.constants';
import {LoginService} from './login.service';
import {LocalStorage} from '../../app.localStorage';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {ElementRef, ViewChild} from '@angular/core';
import {DashboardComponent} from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('modalButton6') modalButton6: ElementRef;
  credentials = {
    username: '',
    password: ''
  };
  errMessage = '';

  constructor(private dasboardComponent: DashboardComponent, private appComponent: AppComponent, private router: Router, private utility: Utility, private loginService: LoginService, private localStorage: LocalStorage) {
  }

  ngOnInit() {
    console.log('ONNNNNNNNNNNNNNNNN' + this.localStorage.getItem('timeout'));
    this.localStorage.clear();
    if (this.localStorage.getItem('timeout') === 'true') {
      console.log('YYYYYYYYYYYYYYYYYYAAAAAAAAAAA');
      this.modalButton6.nativeElement.click();
    }
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
            console.log(JSON.stringify(response));

            this.localStorage.setItem('token', response.session_auth_token);
            this.localStorage.setObject('userDetails', response);
            this.localStorage.setItem('role', response.role_type_name);
            this.appComponent.showIncludes = true;
            this.dasboardComponent.showIncludes = true;
            this.dasboardComponent.isLogged = true;
            this.appComponent.userName = response.first_name + ' ' + response.last_name;
            this.dasboardComponent.userRole = response.role_type_name;
            this.appComponent.userRole = response.role_type_name;
            if (response.role_type_name === 'doctor') {
              this.appComponent.newAppointment = response.appointmentStatus.length;
              this.appComponent.patientDetails = response.appointmentStatus
            }

            if (response.role_type_name === 'admin' || response.role_type_name === 'doctor' || response.role_type_name === 'patient') {
              console.log('NAVIGATING', this.dasboardComponent.isLogged);
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
