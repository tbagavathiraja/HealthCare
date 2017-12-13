import {Component, OnInit, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {
  addUser;
  dashboardClick;
  usersByRole = '';

  constructor(private appcomponent: AppComponent, private router: Router) {

  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.dashboardClick = this.appcomponent.dashboardClick;
    this.addUser = this.appcomponent.addUser;

  }

}
