import {RouterModule, Routes} from '@angular/router';

import {AuthenticationComponent} from './authentication.component';
import {ModuleWithProviders} from '@angular/core';

const loginRoute: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthenticationComponent}
];

export const loginRouter: ModuleWithProviders = RouterModule.forChild(loginRoute);
