import {Component, OnInit} from '@angular/core';
import {GetusersService} from './getusers.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {DashboardComponent} from '../dashboard.component';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit {

  role: string;

  constructor(private userService: GetusersService, private route: ActivatedRoute,
              private router: Router, private dashboardComponent: DashboardComponent) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.role = params['role'];
    });

    this.getUserDetails();
  }

  getUserDetails() {
    console.log('ROLE IS : ' + this.role);

    this.userService.getUsers(this.role)
      .then((roleUserDetails) => {
      //  console.log(this.role + ' : ' + JSON.stringify(roleUserDetails));
        this.dashboardComponent.usersByRole = roleUserDetails;
        this.router.navigate(['dashboard/bookappointment']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
