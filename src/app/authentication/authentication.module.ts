import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login/login.service';
import {loginRouter} from './authentication.routes';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    loginRouter

  ],
  declarations: [AuthenticationComponent, LoginComponent],
  providers: [LoginService]

})
export class AuthenticationModule {
}
