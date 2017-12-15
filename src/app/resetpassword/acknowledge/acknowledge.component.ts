import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {AcknowledgeService} from './acknowledge.service';
import {Router} from '@angular/router';
import {ViewChild} from '@angular/core';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      console.log('false');
      AC.get('confirmPassword').setErrors({MatchPassword: true});
    } else {
      console.log('true');
      return null;
    }
  }
}


@Component({
  selector: 'app-acknowledge',
  templateUrl: './acknowledge.component.html',
  styleUrls: ['./acknowledge.component.css']
})
export class AcknowledgeComponent implements OnInit {
  @ViewChild('modalButton2') modalButton2: ElementRef;
  credentials = {
    password: '',
    token: ''
  };
  passwordForm: FormGroup;
  errMessage = '';

  constructor(private  fb: FormBuilder, private acknowledgeService: AcknowledgeService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.passwordForm = this.fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'confirmPassword': [null, Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  submitPassword(value: any) {
    this.credentials.password = value.password;
    this.credentials.token = this.router.url.split('/')[2];
    console.log('new Password : ' + this.credentials.password + '  ' + this.router.url);
    this.acknowledgeService.updatePassword(this.credentials)
      .then((response) => {
        console.log('TRIGGERING');
        console.log('RES : ' + JSON.stringify(response));
        if (response.status === '1111') {
          this.errMessage = 'SESSION EXPIRED';
          this.modalButton2.nativeElement.click();
        } else {
          this.modalButton2.nativeElement.click();
        }
        this.resetForm();
      })
      .catch((err) => {
        // if(err.code==='ER_DUP_ENTRY')
        this.resetForm();
        console.log('INSIDE CATCHS');
        console.log(err);
      });

  }

  navigate() {
    this.errMessage = '';
    console.log('navigating to login' + this.router.url);
    this.router.navigate(['../login']);
  }

  resetForm() {
    this.createForm();
  }

  ngOnInit() {
  }

}
