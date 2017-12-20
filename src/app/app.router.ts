import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const router: Routes = [
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: ' ', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'resetpassword', loadChildren: './resetpassword/resetpassword.module#ResetpasswordModule'},

];


export const routes: ModuleWithProviders = RouterModule.forRoot(router, {useHash: true});
