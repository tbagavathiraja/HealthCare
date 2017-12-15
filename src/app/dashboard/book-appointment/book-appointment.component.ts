import {Component, OnInit} from '@angular/core';
import {BookAppointmentService} from './book-appointment.service';
import {DashboardComponent} from '../dashboard.component';
import {ElementRef , ViewChild} from '@angular/core';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  @ViewChild('modalButton2') modalButton2: ElementRef;
  userDetails;
  showDetails = false;
  users;

  constructor(private bookAppointmentService: BookAppointmentService, private dashBoardComponent: DashboardComponent) {
  }

  ngOnInit() {
    this.userDetails = this.dashBoardComponent.usersByRole;
    console.log(JSON.stringify(this.userDetails));
  }

  getDetails(index) {
    this.users = this.userDetails[index];
    this.showDetails = true;
    this.modalButton2.nativeElement.click();
  }
}
