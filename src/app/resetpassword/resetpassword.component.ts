import {Component, OnInit} from '@angular/core';
import {Utility} from '../app.utility';
import {ErrorConstants} from '../app.constants';
import {Router} from '@angular/router';
import {ResetpasswordService} from './resetpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  credentials = {
    username: ''
  };
  errMessage = '';
btnclicked = false;
  constructor(private utility: Utility, private router: Router ,
              private resetPasswordService: ResetpasswordService) {
  }

  ngOnInit() {
  }

  resetPassword(value: any) {
this.btnclicked = true;
    if (!this.utility.emailValidate(this.credentials.username)) {
      this.errMessage = ErrorConstants.emailError;
    } else {
      this.errMessage = '';
      this.resetPasswordService.resetPassword(this.credentials)

    }

  }
}
