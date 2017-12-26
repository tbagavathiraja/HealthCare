import {Component, OnInit} from '@angular/core';
import {GetusersService} from './getusers.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {DashboardComponent} from '../dashboard.component';
import {LocalStorage} from '../../app.localStorage';
import {ElementRef, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {DoCheck} from '@angular/core';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit, DoCheck {

  role: string;
  showUsers = false;
  userDetails = [];
  current_user = '';
  showDetails = false;
  searchKey = '';
  userDetailsTemp = [];
  removeUser = false;
  errMessage = '';
  @ViewChild('modalButton8') modalButton8: ElementRef;
  @ViewChild('modalButton14') modalButton14: ElementRef;

  constructor(private dashboardService: DashboardService, private appComponent: AppComponent, private localStorage: LocalStorage, private userService: GetusersService, private route: ActivatedRoute,
              private router: Router, private dashBoardComponent: DashboardComponent) {

  }


  ngDoCheck() {


    this.dashboardService.getSearchKey().subscribe((key) => {
      this.userDetails = this.userDetailsTemp;
      if (typeof key !== 'undefined' && key !== null) {
        if (key.length > 0) {
          this.userDetails = this.userDetails.filter((value) => {
            if (key !== undefined && key !== null) {
              return value['name'].indexOf(key) !== -1;
            }
          });
        }
      }
    });

    const temp = [];
    if (this.dashBoardComponent.showLocation) {
      for (let iloop = 0; iloop < this.userDetails.length; iloop++) {
        const userObj = this.userDetails[iloop];
        if (userObj['location'] === this.dashBoardComponent.selectedLocation) {
          //  console.log('matched', this.dashBoardComponent.usersByRole[iloop]);
          temp.push(this.userDetails[iloop]);
        }
      }
      this.userDetails = temp;

    } else {
      console.log('showing all users');
    }

    this.removeUser = this.dashBoardComponent.removeUser;


  }

  ngOnInit() {
    this.removeUser = this.dashBoardComponent.removeUser;
    this.route.params.subscribe(params => {
      this.role = params['role'];
    });
    //this.router.navigate(['dashboard/bookappointment']);
    this.getUserDetails();
    this.dashboardService.getSearchKey().subscribe((key) =>
      this.searchKey = key
    );
  }

  getUserDetails() {
 this.userService.getUsers(this.role)
      .then((roleUserDetails) => {
        if (roleUserDetails.status === 'INVALID_TOKEN') {
          console.log('INVALID_TOKEN');
          console.log('NAVIGATINGgggggggggg');
          this.localStorage.setItem('timeout', 'true');
          this.router.navigate(['login']);
        } else if (this.role === 'doctor') {
          this.dashBoardComponent.usersByRole = roleUserDetails;
          this.appComponent.userRole = roleUserDetails;

          this.router.navigate(['dashboard/bookappointment']);

        } else {
          this.userDetails = roleUserDetails;
          this.userDetailsTemp = this.userDetails;
          this.dashBoardComponent.usersByRole = roleUserDetails;

          this.showUsers = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDetails(index) {
    this.current_user = this.userDetails[index];
    this.showDetails = true;
    this.modalButton8.nativeElement.click();
  }

  deleteUser(mailId) {
    this.userService.deleteUser(mailId)
      .then((response) => {
        if (response['status'] === '0000') {
          this.dashBoardComponent.removeUser = false;
          this.removeUser = false;
          this.errMessage = '';
        } else {
          this.errMessage = 'server erroe';
        }
        this.modalButton14.nativeElement.click();
        console.log('response : ', response);
      }).catch((err) => {
      console.log('Error : ', err);
    });

  }

}
