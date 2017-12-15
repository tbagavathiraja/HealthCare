import {RouterModule, Routes} from '@angular/router';
import {ResetpasswordComponent} from './resetpassword.component';
import {ModuleWithProviders} from '@angular/core';
import {AcknowledgeComponent} from './acknowledge/acknowledge.component';

const resetPasswordRoute: Routes = [
  {path: '', redirectTo: 'resetpassword', pathMatch: 'full'},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {path: 'acknowledge/:token' , component: AcknowledgeComponent}
];

export const resetPasswordRouter: ModuleWithProviders = RouterModule.forChild(resetPasswordRoute);
