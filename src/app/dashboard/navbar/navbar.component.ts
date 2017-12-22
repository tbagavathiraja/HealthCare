import {Component, OnInit, DoCheck} from '@angular/core';
import {DashboardComponent} from '../dashboard.component';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {LocalStorage} from '../../app.localStorage';
import {LogoutService} from '../logout/logout.service';
import {AppointmentStatusUpdateService} from './appointmentStatusUpdate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  userName = '';
  manageUser = {
    addUser: '',
    view: '',
    remove: ''
  };
  showButton = false;
  statusCount = 0;
  manageClick = false;
  adminClick = false;
  adminOptions = {
    viewHistory: '',
    editHistory: ''
  };
  showDetails = false;
  patientDetails;

  constructor(private updateStatus: AppointmentStatusUpdateService, public logoutService: LogoutService, private localStorage: LocalStorage, private appComponent: AppComponent, private dashboardComponent: DashboardComponent, private  router: Router) {
  }

  manageUsers(event) {
    if (event.target.value === 'add') {
      this.dashboardComponent.addUser = true;
      this.appComponent.addUser = true;
    } else if (event.target.value === 'view') {
      console.log('navvigatin to view');
      this.router.navigate(['dashboard/getusers', 'allusers']);
    }
    console.log('MANAGE USER : ' + event.target.value);
  }

  setshowDetails() {
    this.showDetails = !this.showDetails;
  }

  showButtons(index) {

    if (document.getElementById('button' + index).style.display === 'block') {
      document.getElementById('button' + index).style.display = 'none';
    } else {
      document.getElementById('button' + index).style.display = 'block';
    }
  }

  manageAdminOptions(event) {
    console.log('Admin Options : ' + this.adminOptions);
  }

  myProfile() {
    console.log('myprofile');
    this.router.navigate(['/dashboard/myprofile']);
  }

  ngOnInit() {
    this.userName = this.appComponent.userName;
    this.statusCount = this.appComponent.newAppointment;
    console.log(this.userName);
    console.log(this.appComponent.newAppointment);
    this.patientDetails = this.appComponent.patientDetails;
    console.log('patient details : ', this.patientDetails);

  }

  acceptPatient(index, status) {
    const data = {
      doctor_id: this.patientDetails[index]['doctor_id'],
      patient_id: this.patientDetails[index]['patient_id'],
      date_time: this.patientDetails[index]['date_time']
    };
    console.log(status);
    this.updateStatus.updateStatus(data, status)
      .then((response) => {
        console.log(response);
        if (response.status === 'success') {
          if (status === 'accepted') {
            this.patientDetails[index]['status'] = 0;
          } else {
            this.patientDetails[index]['status'] = -1;
          }
          if (this.statusCount > 1) {
            const temp = this.patientDetails[index];
            this.patientDetails.splice(index, 1);
            this.patientDetails.push(temp);
          }
          this.statusCount = this.statusCount - 1;

          console.log('satus update successfully....');
        }
      }).catch((err) => {
      console.log(err);
    });

  }

  getRole() {
    if (this.dashboardComponent.isLogged) {
      return this.appComponent.userRole;
    }
  }

  setDashboardClick() {
    this.appComponent.dashboardClick = !this.appComponent.dashboardClick;
  }

  logout() {
    this.router.navigate(['login']);
  }

  ngDoCheck() {

  }
}
