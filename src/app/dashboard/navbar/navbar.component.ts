import {Component, OnInit} from '@angular/core';
import {DashboardComponent} from '../dashboard.component';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {LocalStorage} from '../../app.localStorage';
import {LogoutService} from '../logout/logout.service';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('modalButton9', {read: ElementRef}) modalButton9: ElementRef;
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

  constructor(public logoutService: LogoutService, private localStorage: LocalStorage, private appComponent: AppComponent, private dashboardComponent: DashboardComponent, private  router: Router) {
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
    if (this.showDetails) {
      this.modalButton9.nativeElement.click();
    }
  }

  showButtons(index) {

    if(document.getElementById('button' + index).style.display === 'block'){
      document.getElementById('button' + index).style.display = 'none';
    }else{
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

  getRole() {
    if (this.dashboardComponent.isLogged) {
      console.log('user_role', this.appComponent.userRole);
      return this.appComponent.userRole;
    }
  }

  setDashboardClick() {
    console.log('NAVBAR CLICKED' + this.appComponent.dashboardClick);
    this.appComponent.dashboardClick = !this.appComponent.dashboardClick;
  }

  logout() {
    this.router.navigate(['login']);
  }

}
