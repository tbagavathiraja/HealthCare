import {Component, OnInit, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {
  specialists = ['ENT', 'Dermatologist', 'Neurologist', 'Podiatrist', 'Physical_therapist'];
  description = {
    ENT: 'An ENT doctor specializes in conditions and disorders that affect the areas in and around your ears, nose, and throat.',
    Dermatologist: 'A dermatologist is a doctor who specializes in the treatment of conditions and disorders that affect the skin,hair,nails,mouth,node,eyelids',
    Neurologist: 'A neurologist treats conditions and disorders of the nervous system. includes brain,spinal cord,nerves,eyes,skin',
    Podiatrist: 'A podiatrist diagnoses and treats conditions of the foot, ankle, leg, and their surrounding structures.',
    Physical_therapist: 'A physical therapist is a highly trained and licensed medical professional that provides many different types of services. Physical therapists work with people of all ages, sizes, and abilities.',
  };
  addUser;
  dashboardClick;
  usersByRole = [{"user_id":2,"mail_id":"abc@gmail.com","name":"testtest","location":"coimbatore","phone_number":"9092773180"},{"user_id":4,"mail_id":"def@gmail.com","name":"bakstest","location":"chennai","phone_number":"8790952344"},{"user_id":5,"mail_id":"123@gmail.com","name":"xyzhhbhhkb","location":"coimbatore","phone_number":"9876432112"}];
  selectedSpecialist = 'ENT';
  showSpecialist = false;
  showDescription = false;

  constructor(private appcomponent: AppComponent, private router: Router) {

  }

  ngOnInit() {

  }

  getSpecialist(event) {
    this.selectedSpecialist = event.target.value;
    this.showDescription = true;
  }

  ngDoCheck() {
    this.dashboardClick = this.appcomponent.dashboardClick;
    this.addUser = this.appcomponent.addUser;

  }

}
