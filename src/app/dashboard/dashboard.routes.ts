import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {BookAppointmentComponent} from './book-appointment/book-appointment.component';
import {GetusersComponent} from './getusers/getusers.component';
import {MyprofileComponent} from './myprofile/myprofile.component';
import {EditprofileComponent} from './editprofile/editprofile.component';
import {AuthGuardService as AuthGuard} from './auth-guard.service';

const dashboardRoute: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      //   { path: '', redirectTo: 'bookappointment', pathMatch: 'full' },
      {path: 'bookappointment', component: BookAppointmentComponent, canActivate: [AuthGuard]},
      {path: 'getusers/:role', component: GetusersComponent, canActivate: [AuthGuard]},
      {path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuard]},
      {path: 'editprofile', component: EditprofileComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadChildren: '../authentication/authentication.module#AuthenticationModule'}
];

export const dashboardRouter: ModuleWithProviders = RouterModule.forChild(dashboardRoute);
