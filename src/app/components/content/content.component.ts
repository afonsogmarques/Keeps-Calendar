import { Component } from '@angular/core';
import { DateService } from 'src/app/services/dateService/date.service';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderService } from 'src/app/services/reminderService/reminder.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent {
  // initialize current date
  curDate = this.dateService.curDate;
  // get current month's length in days
  curMonthLength: number = this.dateService.getMonthLen(this.curDate.year, this.curDate.monthIndex);

  dayDiff?: number = this.dateService.getDayDiff(); // determines where to start populating days of the month
  reminders: Reminder[] = this.reminderService.getAllReminders();
  modalOpen: boolean = false;

  constructor(
    private dateService:DateService,
    private reminderService:ReminderService,
  ) {}

  toggleModal(): void {
    // store modal element in variable from its id
    const modal = document.getElementById('reminders-modal');
    // add/remove 'hidden' class everytime it's clicked
    modal?.classList.toggle('hidden');  
    // toggle modalOpen to the opposite of what it was
    this.modalOpen = !this.modalOpen;
    // prevent page scrolling when modal is open
    document.body.style.overflowY = this.modalOpen ? 'hidden' : 'initial';
  }

  selectCard(day: number): void {
    // update currently selected date
    this.dateService.updateCurDate(day, this.curDate.monthIndex, this.curDate.year);
    // update it locally
    this.curDate = this.dateService.curDate;
  }

  // update reminders in service and locally
  updateReminder(): void {
    // assign new array so Angular can detect the changes (just learned about this 4 days in)
    this.reminders = [...this.reminderService.getAllReminders()];
  };

  // go back 1 month
  prevMonth(): void {
    // prevent month underflow by checking if it would reach negative numbers
    if (this.curDate.monthIndex - 1 === -1) {
      // set monthIndex back to 12 (12 is off-bounds, but 12 - 1 = 11, which will be December)
      this.curDate.monthIndex = 12;
      // go back one year
      this.curDate.year--;
    }

    // update date in service
    this.dateService.updateCurDate(this.curDate.day, this.curDate.monthIndex - 1, this.curDate.year);

    // update it locally
    this.curDate = this.dateService.curDate;

    // update current month's length
    this.curMonthLength = this.dateService.getMonthLen(this.curDate.year, this.curDate.monthIndex);

    // update week layout
    this.dayDiff = this.dateService.getDayDiff(this.curDate.year, this.curDate.monthIndex);
  }

  // go forwards 1 month
  nextMonth(): void {
    // prevent month overflow by checking if it would reach 12 (off bounds)
    if (this.curDate.monthIndex + 1 === 12) {
      // set monthIndex back to 0 (it's also off-bounds, but -1 + 1 = 0, which will be January)
      this.curDate.monthIndex = -1;
      // go forwards one year
      this.curDate.year++;
    }

    // update date in service
    this.dateService.updateCurDate(this.curDate.day, this.curDate.monthIndex + 1, this.curDate.year);

    // update it locally
    this.curDate = this.dateService.curDate;

    // update current month's length
    this.curMonthLength = this.dateService.getMonthLen(this.curDate.year, this.curDate.monthIndex);

    // update week layout
    this.dayDiff = this.dateService.getDayDiff(this.curDate.year, this.curDate.monthIndex);
  }
}
