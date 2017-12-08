import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {NavbarService} from './navbar.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavbarComponent],
  providers: [ NavbarService],
})
export class NavbarModule { }
