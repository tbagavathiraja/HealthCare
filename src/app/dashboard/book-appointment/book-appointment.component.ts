import {Component, OnInit} from '@angular/core';
import {BookAppointmentService} from './book-appointment.service';
import {DashboardComponent} from '../dashboard.component';
import {ElementRef, ViewChild} from '@angular/core';
import {LocalStorage} from '../../app.localStorage';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Local} from 'protractor/built/driverProviders';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  @ViewChild('modalButton2') modalButton2: ElementRef;
  @ViewChild('modalButton7') modalButton7: ElementRef;
  userDetails;
  showDetails = false;
  users;
  currentDate = new Date();
  myOptions: INgxMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy:mm:dd',
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
  // Initialized to specific date (09.10.2018)
  model: any = {jsdate: new Date()};
  myForm: FormGroup;
  mytime = ' ';
  curr_Time = '';
  booking: {};

  constructor(private localStorage: LocalStorage, private formBuilder: FormBuilder, private bookAppointmentService: BookAppointmentService, private dashBoardComponent: DashboardComponent) {
  }

  ngOnInit() {
    this.userDetails = this.dashBoardComponent.usersByRole;

    let temp = [];
    console.log('in bookig appointment');
    if (this.dashBoardComponent.showSpecialist && this.dashBoardComponent.showLocation) {


      for (let iloop = 0; iloop < this.dashBoardComponent.usersByRole.length; iloop++) {
        console.log(this.dashBoardComponent.usersByRole[iloop]);
        let userObj = this.dashBoardComponent.usersByRole[iloop];
        if (userObj['location'] === this.dashBoardComponent.selectedLocation && userObj['speciality'] === this.dashBoardComponent.selectedSpecialist) {
          console.log('matched', this.dashBoardComponent.usersByRole[iloop]);
          temp.push(this.dashBoardComponent.usersByRole[iloop]);
        }
      }
      this.userDetails = temp;
      console.log('Filtered : ', temp);
      console.log('filter by location', this.dashBoardComponent.selectedLocation);


      console.log('filtering by both');
    } else if (this.dashBoardComponent.showLocation) {
      for (let iloop = 0; iloop < this.dashBoardComponent.usersByRole.length; iloop++) {
        console.log(this.dashBoardComponent.usersByRole[iloop]);
        let userObj = this.dashBoardComponent.usersByRole[iloop];
        if (userObj['location'] === this.dashBoardComponent.selectedLocation) {
          //  console.log('matched', this.dashBoardComponent.usersByRole[iloop]);
          temp.push(this.dashBoardComponent.usersByRole[iloop]);
        }
      }
      this.userDetails = temp;
      console.log('Filtered : ', temp);
      console.log('filter by location', this.dashBoardComponent.selectedLocation);
    } else if (this.dashBoardComponent.showSpecialist) {


      for (let iloop = 0; iloop < this.dashBoardComponent.usersByRole.length; iloop++) {
        console.log(this.dashBoardComponent.usersByRole[iloop]);
        let userObj = this.dashBoardComponent.usersByRole[iloop];
        if (userObj['speciality'] === this.dashBoardComponent.selectedSpecialist) {
          //  console.log('matched', this.dashBoardComponent.usersByRole[iloop]);
          temp.push(this.dashBoardComponent.usersByRole[iloop]);
        }
      }
      this.userDetails = temp;
      console.log('Filtered : ', temp);
    } else {
      console.log('showing all doctors');
      this.userDetails = this.dashBoardComponent.usersByRole;
    }
    console.log(JSON.stringify(this.userDetails));
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
    //  console.log(JSON.stringify(document.getElementById('myTime')) + 'SELECTED DATE : ' + JSON.stringify(value.myDate.formatted));
    this.users.time = this.curr_Time;
    this.users.date = JSON.stringify(value.myDate.formatted);
    this.users.date = this.users.date.substring(1, this.users.date.length - 1);
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


}
