import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {BookAppointmentComponent} from './book-appointment/book-appointment.component';
import {GetusersComponent} from './getusers/getusers.component';

const dashboardRoute: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'bookappointment', component: BookAppointmentComponent},
  {path: 'getusers/:role', component: GetusersComponent }
];

export const dashboardRouter: ModuleWithProviders = RouterModule.forChild(dashboardRoute);
