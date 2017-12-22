import {Component, DoCheck} from '@angular/core';
import {LocalStorage} from './app.localStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck {
  title = 'app';
  dashboardClick = false;
  showIncludes = false;
  addUser = false;
  userRole = '';
  userName = '';
  newAppointment = 0;
  patientDetails;
  usersByRole ;

  constructor(private localStorage: LocalStorage) {
  }

  ngDoCheck() {
    this.userRole = this.localStorage.getItem('role');
    if (this.userRole === 'doctor' && !this.patientDetails === undefined && !this.patientDetails === null)  {
      this.patientDetails = this.localStorage.getObject('userDetails')['appointmentStatus'];
      this.newAppointment = this.patientDetails.length;
    }
  }


}



