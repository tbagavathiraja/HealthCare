import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {AppointmentStatusUpdateService} from './appointmentStatusUpdate.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavbarComponent],
  exports: [ NavbarComponent],
  providers: [ AppointmentStatusUpdateService ]
})
export class NavbarModule { }
