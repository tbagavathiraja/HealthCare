import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '../../app.localStorage';
import {ElementRef, ViewChild} from '@angular/core';
import {EditprofileService} from './editprofile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  @ViewChild('modalButton4') modalButton4: ElementRef;
  @ViewChild('modalButton5') modalButton5: ElementRef;
  myProfile = '';
  newProfile = {
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    email: '',
    userId: ''
  };
  errMessage = '';

  constructor(private router: Router, private localStorage: LocalStorage, private editProfileService: EditprofileService) {
  }

  clearErr() {
    this.errMessage = '';
  }

  ngOnInit() {
    this.myProfile = this.localStorage.getObject('userDetails');
    this.myProfile = JSON.parse(this.myProfile);
    console.log(this.myProfile);
    this.newProfile.userId = this.myProfile['user_id'];
    this.modalButton4.nativeElement.click();
  }

  updateProfile() {
    console.log(this.newProfile);
    if (this.newProfile.firstName.length < 1) {
      this.newProfile.firstName = this.myProfile['first_name'];
    }
    if (this.newProfile.lastName.length < 1) {
      this.newProfile.lastName = this.myProfile['last_name'];
    }
    if (this.newProfile.phone.length < 10) {
      this.newProfile.phone = this.myProfile['phone_number'];
    }
    if (this.newProfile.location.length < 1) {
      this.newProfile.location = this.myProfile['location'];
    }
    this.editProfileService.updateProfile(this.newProfile)
      .then((result) => {

        if (result.status === 'INVALID_TOKEN') {
          console.log('INVALID_TOKEN');
          console.log('NAVIGATING');
          this.localStorage.setItem('timeout', 'true');
          this.router.navigate(['login']);
        } else {
          if (result.status === 'success') {
            this.errMessage = '';
          } else {
            this.errMessage = 'failed';
          }
          this.modalButton5.nativeElement.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

}
