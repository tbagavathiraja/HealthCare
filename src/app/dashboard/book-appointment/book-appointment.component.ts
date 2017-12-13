import {Component, OnInit} from '@angular/core';
import {BookAppointmentService} from './book-appointment.service';
import {DashboardComponent} from '../dashboard.component';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  userDetails;

  constructor(private bookAppointmentService: BookAppointmentService, private dashBoardComponent: DashboardComponent) {
  }

  ngOnInit() {
    this.userDetails = this.dashBoardComponent.usersByRole;
    console.log(this.userDetails[0])

  }
}
