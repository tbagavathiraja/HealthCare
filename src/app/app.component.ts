import {Component, DoCheck} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck {
  title = 'app';
  dashboardClick = false;
  showIncludes = true;
  addUser = false;

  ngDoCheck() {
    /*console.log('in APP' + this.dashboardClick);*/
  }
}



