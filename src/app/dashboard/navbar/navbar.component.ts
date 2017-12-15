import {Component, OnInit} from '@angular/core';
import {DashboardComponent} from '../dashboard.component';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

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
  adminOptions = {
    viewHistory: '',
    editHistory: ''
  };

  constructor(private appComponent: AppComponent, private dashboardComponent: DashboardComponent, private  router: Router) {
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

  setDashboardClick() {
    console.log('NAVBAR CLICKED' + this.appComponent.dashboardClick);
    this.appComponent.dashboardClick = !this.appComponent.dashboardClick;
  }

}
