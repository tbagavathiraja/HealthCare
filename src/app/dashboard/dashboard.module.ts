import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import {DoctorComponent} from './doctor/doctor.component';
import {PatientsComponent} from './patients/patients.component';
import {AdminComponent} from './admin/admin.component';
import {dashboardRouter} from './dashboard.routes';
import {NavbarModule} from './navbar/navbar.module';
import {AddUserComponent} from './adduser/adduser.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, dashboardRouter, NavbarModule , FormsModule , ReactiveFormsModule
  ],
  declarations: [DashboardComponent, DoctorComponent, PatientsComponent, AdminComponent , AddUserComponent ],
  providers: [DashboardService, DashboardComponent ],
})
export class DashboardModule {
}
