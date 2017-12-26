import {Component, OnInit, DoCheck, Input} from '@angular/core';
import {BookAppointmentService} from './book-appointment.service';
import {DashboardComponent} from '../dashboard.component';
import {ElementRef, ViewChild} from '@angular/core';
import {LocalStorage} from '../../app.localStorage';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {DashboardService} from '../dashboard.service';
import {AppComponent} from '../../app.component';
import {GetusersService} from '../getusers/getusers.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit, DoCheck {
  @ViewChild('modalButton2') modalButton2: ElementRef;
  @ViewChild('modalButton7') modalButton7: ElementRef;
  userDetails = [];
  userDetailsTemp = [];
  showDetails = false;
  users;
  currentDate = new Date();
  myOptions: INgxMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    satHighlight: true,
    showTodayBtn: true,
    disableUntil: {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate() - 1
    },
    markCurrentDay: true,
    minYear: 2000,
    maxYear: 3000,
    disableWeekends: true,
  };
  searchKey = '';
  // Initialized to specific date (09.10.2018)
  model: any = {jsdate: new Date()};
  myForm: FormGroup;
  mytime = ' ';
  curr_Time = '';
  booking: {};

  constructor(private getUserService: GetusersService, private dashboardService: DashboardService, private localStorage: LocalStorage,
              private formBuilder: FormBuilder, private bookAppointmentService: BookAppointmentService,
              private dashBoardComponent: DashboardComponent) {
  }

  ngDoCheck() {

    this.dashboardService.getSearchKey().subscribe((key) => {
      this.userDetails = this.userDetailsTemp;
      if (typeof key !== 'undefined' && key !== null) {
        this.searchKey = key;
        if (key.length > 0) {
          console.log(key + '  ' + this.userDetails);
          this.userDetails = this.userDetails.filter((value) => {
            if (key !== undefined && key !== null) {
              return value['name'].indexOf(key) !== -1;
            }
          });
          // console.log('result is : ', result);
        }
      }
    });


    const temp = [];
    if (this.dashBoardComponent.showSpecialist && this.dashBoardComponent.showLocation) {

      for (let iloop = 0; iloop < this.userDetails.length; iloop++) {
        const userObj = this.userDetails[iloop];
        if (userObj['location'] === this.dashBoardComponent.selectedLocation &&
          userObj['speciality'] === this.dashBoardComponent.selectedSpecialist) {
          temp.push(this.userDetails[iloop]);
        }
      }
      this.userDetails = temp;
    } else if (this.dashBoardComponent.showLocation) {
      for (let iloop = 0; iloop < this.userDetails.length; iloop++) {
        const userObj = this.userDetails[iloop];
        if (userObj['location'] === this.dashBoardComponent.selectedLocation) {
          //  console.log('matched', this.dashBoardComponent.usersByRole[iloop]);
          temp.push(this.userDetails[iloop]);
        }
      }
      this.userDetails = temp;
    } else if (this.dashBoardComponent.showSpecialist) {


      for (let iloop = 0; iloop < this.userDetails.length; iloop++) {
        const userObj = this.userDetails[iloop];
        if (userObj['speciality'] === this.dashBoardComponent.selectedSpecialist) {
          //  console.log('matched', this.dashBoardComponent.usersByRole[iloop]);
          temp.push(this.userDetails[iloop]);
        }
      }
      this.userDetails = temp;

    } else {
      if (this.searchKey.length <= 0) {
        this.userDetails = this.userDetailsTemp;
      }
      console.log('showing all doctors');
    }

  }

  ngOnInit() {
    this.getUserService.getUsers('doctor')
      .then((roleUserDetails) => {
        console.log('no err');
        this.userDetails = roleUserDetails;
        this.userDetailsTemp = this.userDetails;
        console.log(this.userDetails);
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });

    // this.userDetails = this.appComponent.usersByRole;
    this.dashboardService.getSearchKey().subscribe((key) =>
      this.searchKey = key
    );

    this.myForm = this.formBuilder.group({
      // Empty string or null means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.

      myDate: [null, Validators.required]

      // other controls are here...
    });

    this.curr_Time = this.currentDate.getHours() + ':' + this.currentDate.getMinutes() + ':' + this.currentDate.getSeconds();
  }

  getDetails(index) {
    this.users = this.userDetails[index];
    this.showDetails = true;
    this.modalButton2.nativeElement.click();
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.myForm.patchValue({
      myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({myDate: null});
  }

  onSubmit(value: any) {
    console.log(JSON.stringify(document.getElementById('myTime')['value']) + 'SELECTED DATE : ' + JSON.stringify(value.myDate.formatted));
    this.users.time = document.getElementById('myTime')['value'];
    this.users.date = value.myDate.formatted;
    // this.users.date = this.users.date.substring(1, this.users.date.length - 1);
    this.users.patient_id = JSON.parse(this.localStorage.getObject('userDetails'))['user_id'];
    console.log(this.users);
    console.log('SUBMITTED');
    this.bookAppointmentService.bookAppointment(this.users)
      .then((result) => {
        if (result.status === 'success') {
          this.modalButton7.nativeElement.click();
        }

        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });


  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
  }

  checkValue(value) {
    console.log('Type of : ', value, 'ttttt', typeof this.userDetails);
    if (typeof value === 'object') {
      return true;
    } else {
      return false;
    }
  }

  checkUndefinedType(value) {
    if (typeof value !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  private checkKey(value) {
    console.log('Inside method : ', this.searchKey);
    if (this.searchKey !== undefined && this.searchKey !== null) {
      console.log('METHOD ', value['name']);
      console.log(this.searchKey);
      return value['name'].indexOf('a') !== -1;
    } else {
      return false;
    }
  }


}
