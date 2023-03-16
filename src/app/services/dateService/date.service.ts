import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  today: Date = new Date();
  todaysDate: number = this.today.getDate();
  todaysMonthIndex: number = this.today.getMonth();
  todaysYear: number = this.today.getFullYear();

  curDate = {
    day: this.todaysDate,
    monthIndex: this.todaysMonthIndex,
    year: this.todaysYear
  }

  constructor() {
  }

  // transform date into a more readable format
  // defaults to today's values if no arguments specified
  getDateStr(
    day: number = this.todaysDate,
    month: number = this.todaysMonthIndex,
    year: number = this.todaysYear,
  ): string {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
    }).format(new Date(year, month, day));
  }

  // get specific month's length
  getMonthLen(
    year: number,
    month: number
  ): number {
    console.log(new Date(year, month + 1, 0).getDate());
    return new Date(year, month + 1, 0).getDate();
  }

  // determine where week should start, aka dayDiff
  // defaults to today's week's first weekday if no argument specified
  getDayDiff(
    year: number = this.todaysYear, 
    month: number = this.todaysMonthIndex): number {
    return new Date(year, month, 1).getDay() === 7 ? 0 : new Date(year, month, 1).getDay();
  }

  // update the currently selected date
  updateCurDate(day: number, monthIndex: number, year: number): void {
    this.curDate = {
      day,
      monthIndex,
      year
    }
  }

  // get simple Date based on parameters
  getNewDate(year: number, month: number,  day: number): Date {
    return new Date(year, month, day);
  }
}
