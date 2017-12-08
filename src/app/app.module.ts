import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Utility} from './app.utility';
import {routes} from './app.router';
import {AuthenticationModule} from './authentication/authentication.module';
import {CommonModule} from '@angular/common';

import {NavbarModule} from './navbar/navbar.module';
import {DashboardModule} from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AuthenticationModule, routes, NavbarModule, DashboardModule, CommonModule
  ],
  providers: [Utility],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
