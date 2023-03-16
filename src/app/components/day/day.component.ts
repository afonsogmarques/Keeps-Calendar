import { Component, Input, SimpleChanges} from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderService } from 'src/app/services/reminderService/reminder.service';
import { DateService } from 'src/app/services/dateService/date.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {
  @Input() curDate: any;
  @Input() index!: number;
  @Input() reminders!: Reminder[];

  todaysReminders?: Reminder[];

  today: Date = this.dateService.today;
  isToday: boolean = false;

  constructor(
    private reminderService:ReminderService,
    private dateService:DateService,
  ) {};

  ngOnInit() {
    // update reminders on render
    this.updateLocalReminders();
    // check if any of the days are today
    this.isToday = this.dateService.getNewDate(this.curDate.year, this.curDate.monthIndex, this.index).toDateString() === this.today.toDateString() ? true : false;
  }

  ngOnChanges(changes: SimpleChanges) {
    // if changes to reminders have been made, update local reminders
    if (changes['reminders'] && changes['reminders'].previousValue !== changes['reminders'].currentValue) this.updateLocalReminders();
    // if changes to current date have been made
    if (changes['curDate'] && changes['curDate'].previousValue !== changes['curDate'].currentValue) {
      // update local reminders
      this.updateLocalReminders();
      // check if any of the days are today
      this.isToday = this.dateService.getNewDate(this.curDate.year, this.curDate.monthIndex, this.index).toDateString() === this.today.toDateString() ? true : false;
    }
  }

  // update local reminders for specific day so they can show up or disappear from card
  updateLocalReminders(): void {
    this.todaysReminders = [...this.reminderService.getDayReminders(this.index, this.curDate.monthIndex, this.curDate.year)];
  }
}
