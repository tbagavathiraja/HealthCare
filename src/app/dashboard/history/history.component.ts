import {Component, OnInit} from '@angular/core';
import {HistoryService} from './history.service';
import {LocalStorage} from '../../app.localStorage';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  user = '';
  userDetails;
  showDetails = false;
  users;

  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.historyService.getHistory()
      .then((response) => {
        this.userDetails = response;
        console.log(response);
      }).catch((err) => {
      console.log(err);
    });
  }

  getDetails(index) {
    this.users = this.userDetails[index];
    this.showDetails = true;
  }

}
