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
import {BookAppointmentComponent} from './book-appointment/book-appointment.component';
import {BookAppointmentService} from './book-appointment/book-appointment.service';
import {GetusersComponent} from './getusers/getusers.component';
import {GetusersService} from './getusers/getusers.service';
import {DatepickerComponent} from './datepicker/datepicker.component';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
     CommonModule, dashboardRouter, NavbarModule, FormsModule, ReactiveFormsModule , NgxMyDatePickerModule.forRoot()
  ],
  declarations: [DashboardComponent, AddUserComponent, BookAppointmentComponent, GetusersComponent, DatepickerComponent],
  providers: [GetusersService, DashboardService, DashboardComponent, AddUserService, BookAppointmentService],
})
export class DashboardModule {
}
