import {Component, OnInit, DoCheck} from '@angular/core';
import {HistoryService} from './history.service';
import {LocalStorage} from '../../app.localStorage';
import {DashboardComponent} from '../dashboard.component';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, DoCheck {

  user = '';
  userRole = '';
  userDetails = [];
  userDetailsTemp = [];
  showDetails = false;
  users;
  searchKey = '';

  constructor(private dashBoardService: DashboardService, private dashboardComponent: DashboardComponent, private historyService: HistoryService) {
  }

  ngDoCheck() {

    this.dashBoardService.getSearchKey().subscribe((key) => {
      this.userDetails = this.userDetailsTemp;
      if (typeof key !== 'undefined' && key !== null) {
        this.searchKey = key;
        if (key.length > 0) {
          console.log('filter : ', this.userDetails)
          this.userDetails = this.userDetails.filter((value) => {
            if (key !== undefined && key !== null) {
              return value['patient_name'].indexOf(key) !== -1;
            }
          });
        }
      }

    });

    const temp = [];
    if (this.dashboardComponent.showLocation) {
      if (this.searchKey.length <= 0) {
        this.userDetails = this.userDetailsTemp;
      }

      for (let iloop = 0; iloop < this.userDetails.length; iloop++) {
        const userObj = this.userDetails[iloop];
        if (userObj['location'] === this.dashboardComponent.selectedLocation) {
          //  console.log('matched', this.dashBoardComponent.usersByRole[iloop]);
          temp.push(this.userDetails[iloop]);
        }
      }
      this.userDetails = temp;

    } else {
      if (this.searchKey.length <= 0) {
        this.userDetails = this.userDetailsTemp;
      }
    }

  }

  ngOnInit() {
    this.userRole = this.dashboardComponent.userRole;
    this.historyService.getHistory()
      .then((response) => {
        this.userDetails = response;
        this.userDetailsTemp = this.userDetails;
        console.log(response);
      }).catch((err) => {
      console.log(err);
    });
    this.dashBoardService.getSearchKey().subscribe((key) =>
      this.searchKey = key
    );
  }

  getDetails(index) {
    this.users = this.userDetails[index];
    this.showDetails = true;
  }

}
