import {Component, OnInit, DoCheck} from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

  dashboardClick;

  constructor(private appComponent: AppComponent) {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.dashboardClick = this.appComponent.dashboardClick;
  }

}
