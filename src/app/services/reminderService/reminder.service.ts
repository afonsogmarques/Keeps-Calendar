import { Injectable } from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  REMINDERS: Reminder[] = [];

  MAX_LENGTH: number = 30;

  constructor() { 
    // set the local reminders array to the localStorage reminders on load
    if (localStorage.getItem('reminders')) this.REMINDERS = JSON.parse(localStorage.getItem('reminders')!);
  }

  // return all the reminders
  getAllReminders(): Reminder[] {
    // sort reminders by time before returning them
    return [...this.REMINDERS].sort((a, b) => a.date.time.localeCompare(b.date.time));
  }

  // add a Reminder to the REMINDERS array
  addReminder(value: Reminder): void {
    // push value to local reminders array
    this.REMINDERS.push(value);
    // set localStorage item to be the same as local array because it's updated everytime the app loads
    localStorage.setItem('reminders', JSON.stringify(this.REMINDERS));
  }

  // (development only) add 1 to the id of the last Reminder in the REMINDERS array and return it
  generateId(): number {
    return this.REMINDERS.length ? this.REMINDERS[this.REMINDERS.length - 1].id + 1 : 1;
  }

  // delete reminder based on id
  deleteReminder(id: number) {
    // find reminder to delete
    const reminderToDel = this.REMINDERS.find(reminder => reminder.id === id);
    // splice REMINDERS array and delete task
    this.REMINDERS.splice(this.REMINDERS.indexOf(reminderToDel!), 1);
    // set localStorage to equal local reminders array
    localStorage.setItem('reminders', JSON.stringify(this.REMINDERS));
  }

  // edit reminder based on id
  editReminder(id: number, value: Reminder): void {
    // find which reminder to edit
    const reminderToEdit = this.REMINDERS.find(reminder => reminder.id === id);
    // replace its value by the one passed as the 'value' argument to the fucntion
    this.REMINDERS[this.REMINDERS.indexOf(reminderToEdit!)] = value;
    // set localStorage to equal local reminders array
    localStorage.setItem('reminders', JSON.stringify(this.REMINDERS));
  }

  // return only the reminders whose day, month and year correspond with the ones passed as the function's arguments
  getDayReminders(day: number, month: number, year: number): Reminder[] {
    return [...this.REMINDERS].filter(reminder => 
      reminder.date.day === day && 
      reminder.date.monthIndex === month && 
      reminder.date.year === year)
    .sort((a, b) => a.date.time.localeCompare(b.date.time))
  };

  // get a single reminder based on its id
  getSingleReminder(id: number): Reminder {
    // if it can find the reminder, return it
    if (this.REMINDERS.find(reminder => reminder.id === id)) return this.REMINDERS.find(reminder => reminder.id === id)!
    // else, throw an error
    throw new Error(`Reminder with id ${id} not found!`);
  }
}
