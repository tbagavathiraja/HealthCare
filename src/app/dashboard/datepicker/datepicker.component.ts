import {Component, OnInit} from '@angular/core';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  currentDate = new Date();

  myOptions: INgxMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    satHighlight: true,
    disableUntil: {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate() - 1
    }, showTodayBtn: true,
    disableSince: {year: 2000, month: 1, day: 1},
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    minYear: 2000,
    maxYear: 3000,
    disableWeekends: true,
    showWeekNumbers: true
  };
  // Initialized to specific date (09.10.2018)
  model: any = {jsdate: new Date()};
  private myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      // Empty string or null means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.

      myDate: [null, Validators.required]

      // other controls are here...
    });
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.myForm.patchValue({
      myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({myDate: null});
  }

  onSubmit(value: any) {
    console.log("SELECTED DATE : " + JSON.stringify(value));
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
  }
}
