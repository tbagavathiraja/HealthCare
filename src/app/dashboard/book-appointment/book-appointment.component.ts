import { Component, OnInit } from '@angular/core';
import {BookAppointmentService} from './book-appointment.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  constructor(private bookAppointmentService: BookAppointmentService) { }

  ngOnInit() {

    this.bookAppointmentService.showDoctord();



  }

}
