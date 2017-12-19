import {Component, OnInit, DoCheck, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck, OnDestroy {
  specialists = ['ENT', 'Dermatologist', 'Neurologist', 'Podiatrist', 'Physical_therapist'];
  description = {
    ENT: 'An ENT doctor specializes in conditions and disorders that affect the areas in and around your ears, nose, and throat.',
    Dermatologist: 'A dermatologist is a doctor who specializes in the treatment of conditions and disorders that affect the skin,hair,nails,mouth,node,eyelids',
    Neurologist: 'A neurologist treats conditions and disorders of the nervous system. includes brain,spinal cord,nerves,eyes,skin',
    Podiatrist: 'A podiatrist diagnoses and treats conditions of the foot, ankle, leg, and their surrounding structures.',
    Physical_therapist: 'A physical therapist is a highly trained and licensed medical professional that provides many different types of services. Physical therapists work with people of all ages, sizes, and abilities.',
  };
  toggle = false;
  showDetails = false;
  locations = ['chennai', 'coimbatore', 'trichy', 'madurai'];
  addUser;
  dashboardClick;
  usersByRole = '';
  @ViewChild('modalButton9') modalButton9: ElementRef;
  selectedSpecialist = 'ENT';
  showSpecialist = false;
  showLocation = false;
  showDescription = false;
  selectedLocation = 'chennai';
  showIncludes = false;
  isLogged = true;
  userRole = '';
  checkboxValue: boolean;

  constructor(private appcomponent: AppComponent, private router: Router) {

  }

  isLoggedIn() {
    return this.isLogged;
  }

  filterService() {
    console.log(this.checkboxValue);
  }

  getInfo() {
    /* console.log('in dashboard')
     if (this.showSpecialist && this.showLocation) {
       console.log('filtering by both');
     }else if (this.showLocation) {
       console.log('filter by location', this.selectedLocation);
     } else if (this.showSpecialist) {
       console.log('filtering by specialist', this.selectedSpecialist);
     }*/
    this.router.navigate(['dashboard/getusers', 'doctor']);

  }

  ngOnInit() {
    this.showIncludes = true;
    console.log(this.userRole);
  }

  getLocation(event) {
    this.selectedLocation = this.locations[event.target.value];
    this.showLocation = true;
  }

  getSpecialist(event) {
    this.selectedSpecialist = event.target.value;
    this.showDescription = true;
  }

  ngDoCheck() {
    this.dashboardClick = this.appcomponent.dashboardClick;
    this.addUser = this.appcomponent.addUser;


  }

  ngOnDestroy() {
    this.showIncludes = false;
  }


}
