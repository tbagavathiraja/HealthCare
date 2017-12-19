import {Component, OnInit} from '@angular/core';
import {GetusersService} from './getusers.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {DashboardComponent} from '../dashboard.component';
import {LocalStorage} from '../../app.localStorage';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit {

  role: string;
  showUsers = false;
  userDetails = '';
  current_user = '';
  showDetails = false;
  @ViewChild('modalButton8') modalButton8: ElementRef;

  constructor(private localStorage: LocalStorage, private userService: GetusersService, private route: ActivatedRoute,
              private router: Router, private dashboardComponent: DashboardComponent) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.role = params['role'];
    });
    //this.router.navigate(['dashboard/bookappointment']);
    this.getUserDetails();
  }

  getUserDetails() {
    console.log('ROLE IS : ' + this.role);

    this.userService.getUsers(this.role)
      .then((roleUserDetails) => {
        if (roleUserDetails.status === 'INVALID_TOKEN') {
          console.log('INVALID_TOKEN');
          console.log('NAVIGATINGgggggggggg');
          this.localStorage.setItem('timeout', 'true');
          this.router.navigate(['login']);
        } else if (this.role === 'doctor') {
          console.log(this.role + ' : ' + JSON.stringify(roleUserDetails));
          this.dashboardComponent.usersByRole = roleUserDetails;
          this.router.navigate(['dashboard/bookappointment']);
        } else {
          this.userDetails = roleUserDetails;
          console.log('good');
          console.log('user details', this.userDetails);

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

}
