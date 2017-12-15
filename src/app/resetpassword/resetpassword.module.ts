import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetpasswordComponent} from './resetpassword.component';
import {ResetpasswordService} from './resetpassword.service';
import {resetPasswordRouter} from './resetpassword.routes';
import {FormsModule} from '@angular/forms';
import { AcknowledgeComponent } from './acknowledge/acknowledge.component';
import {AcknowledgeService} from './acknowledge/acknowledge.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule , resetPasswordRouter , FormsModule , ReactiveFormsModule
  ],
  declarations: [ ResetpasswordComponent, AcknowledgeComponent ],
  providers: [ ResetpasswordService , AcknowledgeService]
})
export class ResetpasswordModule { }
