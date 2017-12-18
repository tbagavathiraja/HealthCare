import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Utility} from './app.utility';
import {routes} from './app.router';
import {HttpModule} from '@angular/http';
import {AuthenticationModule} from './authentication/authentication.module';
import {CommonModule} from '@angular/common';
import {LocalStorage} from './app.localStorage';
import {NavbarModule} from './dashboard/navbar/navbar.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetpasswordModule} from './resetpassword/resetpassword.module';
import {AuthGuardService} from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule, ResetpasswordModule, BrowserModule, AuthenticationModule, routes, NavbarModule, DashboardModule, CommonModule, HttpModule
  ],
  providers: [Utility, LocalStorage, AppComponent , AuthGuardService],
  exports: [ AppComponent] ,
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
