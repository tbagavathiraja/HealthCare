import {Component, OnInit} from '@angular/core';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  myOptions: INgxMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    disableUntil: {year: 2016, month: 8, day: 10}
  };

  // Initialized to specific date (09.10.2018)
  model: any = {date: {year: 2018, month: 10, day: 9}};

  constructor() {
  }

  ngOnInit() {
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
  }
}
