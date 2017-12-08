import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {DoctorComponent} from './doctor/doctor.component';
import {PatientsComponent} from './patients/patients.component';
import {ModuleWithProviders} from '@angular/core';
import {DashboardComponent} from './dashboard.component';

const dashboardRoute: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'doctor', component: DoctorComponent},
  {path: 'patient', component: PatientsComponent}
];

export const dashboardRouter: ModuleWithProviders = RouterModule.forChild(dashboardRoute);
