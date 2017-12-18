import {Component, OnInit} from '@angular/core';
import {DashboardComponent} from '../dashboard.component';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {LocalStorage} from '../../app.localStorage';
import {LogoutService} from '../logout/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  manageUser = {
    addUser: '',
    view: '',
    remove: ''
  };
  manageClick = false;
  adminClick = false;
  adminOptions = {
    viewHistory: '',
    editHistory: ''
  };

  constructor(public logoutService: LogoutService, private localStorage: LocalStorage, private appComponent: AppComponent, private dashboardComponent: DashboardComponent, private  router: Router) {
  }

  manageUsers(event) {
    if (event.target.value === 'add') {
      this.dashboardComponent.addUser = true;
      this.appComponent.addUser = true;
    }
    console.log('MANAGE USER : ' + event.target.value);
  }

  manageAdminOptions(event) {
    console.log('Admin Options : ' + this.adminOptions);
  }

  ngOnInit() {

  }

  getRole() {
    if (this.appComponent.isLogged) {
      return JSON.parse(this.localStorage.getObject('userDetails')).role_type_name === null ? 'doctor' : 'admin';
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
