import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';

import {dashboardRouter} from './dashboard.routes';
import {NavbarModule} from './navbar/navbar.module';
import {AddUserComponent} from './adduser/adduser.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AddUserService} from './adduser/adduser.service';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import {BookAppointmentService} from './book-appointment/book-appointment.service';

@NgModule({
  imports: [
    CommonModule, dashboardRouter, NavbarModule , FormsModule , ReactiveFormsModule
  ],
  declarations: [DashboardComponent, AddUserComponent, BookAppointmentComponent ],
  providers: [DashboardService, DashboardComponent , AddUserService , BookAppointmentService ],
})
export class DashboardModule {
}
