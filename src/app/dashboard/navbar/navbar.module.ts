import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {AppointmentStatusUpdateService} from './appointmentStatusUpdate.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule , RouterModule
  ],
  declarations: [NavbarComponent],
  exports: [ NavbarComponent],
  providers: [ AppointmentStatusUpdateService ]
})
export class NavbarModule { }
