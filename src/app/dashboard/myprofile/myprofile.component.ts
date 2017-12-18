import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '../../app.localStorage';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  @ViewChild('modalButton3') modalButton3: ElementRef;
  myProfile = '';

  constructor(private localStorage: LocalStorage) {
  }

  ngOnInit() {
    this.myProfile = this.localStorage.getObject('userDetails');
    this.myProfile = JSON.parse(this.myProfile);
    console.log(this.myProfile);
    this.modalButton3.nativeElement.click();

  }

}
