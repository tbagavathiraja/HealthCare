import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddUserService} from './adduser.service';
import {LocalStorage} from '../../app.localStorage';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit, OnChanges {
  @ViewChild('modalButton') modalButton: ElementRef;
  @ViewChild('modalButton1') modalButton1: ElementRef;
  @Input() show;
  roles = ['Admin', 'Doctor', 'Patient'];
  selectedRole = 'Admin';
  newUser = {
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
    officeNumber: '',
    role: '',
    emailId: '',
    password: '',

  };
  complexForm: FormGroup;
  errMessage = '';

  constructor(private appComponent: AppComponent,
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
  }

  submitForm(value: any) {
    this.newUser = value;
    console.log('SUBMITTED');
    this.newUser.role = this.selectedRole;
    console.log(this.newUser);
    this.userService.addUser(this.newUser)
      .then((response) => {
        console.log('RES : ' + JSON.stringify(response));
        if (response.status === '3500') {
          this.errMessage = 'User alreadey Exist';
          console.log('EEEEEEEEEEEE' + this.errMessage);
          this.modalButton1.nativeElement.click();
        } else {
          this.modalButton1.nativeElement.click();
        }
        this.reset();
      })
      .catch((err) => {
        // if(err.code==='ER_DUP_ENTRY')
        this.reset();
        console.log('INSIDE CATCHS');
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

  showPopup() {
    this.modalButton.nativeElement.click();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes : ' + JSON.stringify(changes));
    if (this.appComponent.addUser) {
      this.modalButton.nativeElement.click();
    }
  }


}