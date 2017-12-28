import {Component, ElementRef, Input, OnChanges, DoCheck, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddUserService} from './adduser.service';
import {LocalStorage} from '../../app.localStorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit, OnChanges,DoCheck {
  @ViewChild('modalButton') modalButton: ElementRef;
  @ViewChild('modalButton1') modalButton1: ElementRef;
  @Input() show;
  roles = ['admin', 'doctor', 'patient'];
  selectedRole = 'admin';
  newUser = {
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
    officeNumber: '',
    role: '',
    emailId: '',
    password: '',
    speciality: ''

  };
  complexForm: FormGroup;
  errMessage = '';
  showSpeciality = false;
  selectedSpeciality = 'ENT';
  specialityList = ['ENT', 'Dermatologist', 'Neurologist', 'Podiatrist', 'Physical_therapist'];

  constructor(private localStorage: LocalStorage, private router: Router, private appComponent: AppComponent,
              private  fb: FormBuilder, private userService: AddUserService) {
    this.createForm();

  }


  createForm() {
    this.complexForm = this.fb.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'lastName': [null, Validators.required],
      'location': [null, Validators.required],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      'office': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]' +
        '*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])]
    });
  }

  getRole(event) {
    this.selectedRole = event.target.value;
    if (this.selectedRole === 'doctor') {
      this.showSpeciality = true;
    } else {
      this.showSpeciality = false;
    }
  }

  setSpeciality(event) {
    this.selectedSpeciality = event.target.value;
  }

  submitForm(value: any) {
    this.newUser = value;
    console.log('SUBMITTED');
    this.newUser.role = this.selectedRole;
    if (this.selectedRole === 'doctor') {
      this.newUser.speciality = this.selectedSpeciality;
    }
    console.log(this.newUser);
    this.userService.addUser(this.newUser)
      .then((response) => {
        console.log('RES : ' + JSON.stringify(response));
        if (response.status === 'INVALID_TOKEN') {
          console.log('INVALID_TOKEN');
          console.log('NAVIGATING');
          this.localStorage.setItem('timeout', 'true');
          this.router.navigate(['login']);
        } else {
          if (response.status === '3500') {
            this.errMessage = 'User alreadey Exist';
            this.modalButton1.nativeElement.click();
          } else {
            this.modalButton1.nativeElement.click();
          }
          this.appComponent.addUser = false;
        }
        this.reset();
      })
      .catch((err) => {
        // if(err.code==='ER_DUP_ENTRY')
        this.reset();
        console.log(err);
      });

  }

  reset() {
    this.createForm();
  }

  close() {
    this.reset();
    this.appComponent.addUser = false;
  }

  ngOnInit() {
  }


ngDoCheck(){

}
  ngOnChanges(changes: SimpleChanges) {
    if (this.appComponent.addUser) {
      this.modalButton.nativeElement.click();
    }
  }


}
