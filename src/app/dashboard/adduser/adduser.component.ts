import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('modalButton') modalButton: ElementRef;
  @Input() show;
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


  constructor(private appComponent: AppComponent, private  fb: FormBuilder) {

    this.createForm();

  }


  createForm() {


    this.complexForm = this.fb.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'lastName': [null, Validators.required],
      'location': [null, Validators.required],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      'office': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
    });

  }


  submitForm(value: any) {
    console.log(value);
    this.reset();
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

  ngOnDestroy() {
    console.log('DESTTTTT');
  }

  afterHidden() {
    console.log('POPUP CLOSED' + event);
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
