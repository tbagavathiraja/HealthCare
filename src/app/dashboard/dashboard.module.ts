import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientsComponent } from './patients/patients.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, DoctorComponent, PatientsComponent, AdminComponent],
  providers: [DashboardService],
  exports: [DashboardComponent]
})
export class DashboardModule {
}
