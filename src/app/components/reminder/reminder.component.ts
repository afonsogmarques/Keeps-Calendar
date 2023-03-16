import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderService } from 'src/app/services/reminderService/reminder.service';
import { Tag } from 'src/app/interfaces/tag';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent {
  @Output() editRemindersEvent = new EventEmitter<Event>();

  @Input() reminders?: Reminder[];
  @Input() tag?: string;
  @Input() time?: string;
  @Input() body?: string;
  @Input() id!: number;
  @Input() tags!: Tag[];
  
  editing: boolean = false;

  editReminderInputValue: string = '';
  editReminderDateTimeValue?: string;
  editReminderTagValue?: string;

  editReminderInputLen: number = 0;

  constructor(private reminderService:ReminderService) {};

  ngOnInit():void {
  }

  handleDeleteReminder(id: number): void {
    // call reminderService's delete reminder with the id from the prop
    this.reminderService.deleteReminder(id);

    // fire an event to let parent component know reminders have changed
    this.editRemindersEvent.emit();
  }

  handleEditReminder(id: number): void {
    // show / hide 'in-place' edit form
    this.editing = !this.editing;

    // extract relevant properties from clicked reminder
    const { body, date, tag:tagValue } = this.reminderService.getSingleReminder(id);
    const { day, monthIndex, year, time } = date;

    // pause for a moment to allow UI to display edit form (would be a promise if fetching data from an actual server)
    setTimeout(() => {
      // set default date and time to the ones already stored in the relevant input
      // this, however, doesn't work too well, since it behaves as if no time has been selected, so I tried a workaround in the function below **
      (<HTMLInputElement>document.getElementById('' + id))
        .value = `${year}-${monthIndex.toString().length === 1 ? '0' + (monthIndex + 1) : monthIndex + 1}-${day.toString().length === 1 ? '0' + day : day}T${time}`;

      // set reminder body to the one already stored in the relevant input
      (<HTMLInputElement>document.querySelector(`input[type='text'][id='${id}']`)).value = body;

      // set new edited tag default value to the current tag value
      this.editReminderTagValue = tagValue;
      // initialize input length for character count
      this.editReminderInputLen = body.length;
      // set new edit reminder input to current body
      this.editReminderInputValue = body;

      // get current tag index
      const index = this.tags.indexOf(this.tags.filter(tag => tag.value === tagValue)[0]);
      // get select input and set its default value to the current tag
      (<HTMLSelectElement>document.querySelector(`select[id='${id}']`)).selectedIndex = index + 1;



    }, 5)

  };

  handleCancelEditReminder(): void {
    this.editing = false;
  }

  submitEditReminder(value: string, id: number): void {
    // if nothing is written in the body
    if (!value) {
      // get current reminder text input and set its border to red
      (<HTMLInputElement>document.querySelector(`input[type='text'][id='${id}']`))?.parentElement?.classList.add('border-b-red-400');
      // return
      return;
    };

    // return if reminder is 31 chars or longer
    if (value.length > 30) return;

    // ** WORKAROUND
    // give dateTime the already existing value from the selected reminder
    const { day: prevDay, monthIndex: prevMonthIndex, year: prevYear, time: prevTime } = this.reminderService.getSingleReminder(id).date;

    // next line only for readability
    const dateTime = this.editReminderDateTimeValue ? 
      this.editReminderDateTimeValue : 
        `${prevYear}-${prevMonthIndex.toString().length === 1 ? '0' + (prevMonthIndex + 1) : prevMonthIndex + 1}-${prevDay.toString().length === 1 ? '0' + prevDay : prevDay}T${prevTime}`;

    // store every value from the inputs in variables, also for readability
    const time = dateTime.slice(dateTime.indexOf('T') + 1);
    const year = +dateTime.slice(0, 4);
    const monthIndex = +dateTime.slice(5, 7) - 1;
    const day = +dateTime.slice(8, 10);
    const tag = this.editReminderTagValue ?? '';
    const body = this.editReminderInputValue ?? '';

    // call editReminder() from reminderService to actually edit the reminders array
    this.reminderService.editReminder(id, {
      id,
      date: {
        day,
        monthIndex,
        year,
        time
      },
      tag,
      body,
    });

    // fire an event to let parent component know that reminders have been edited
    this.editRemindersEvent.emit();
  }

  // when enter key is pressed
  onEnterEditReminder(event: any, id: number): void {
    // delegate task to submitEditReminder()
    this.submitEditReminder(event.target.value, id);
  };

  checkReminderLength(event: KeyboardEvent, id: number): void {
    // find element
    const element = (<HTMLInputElement>document.querySelector(`input[type='text'][id='${id}']`));
    
    // Welcome to indentation hell to keep track of input length 
    // many edge cases here were not accounted for due to lack of time (e.g. mouse selecting a chunk of text and deleting it)
    // if command/ctrl key is pressed
    if (event.metaKey) {
      // if deleting characters
      if (event.key === 'Backspace' || event.key === 'Delete') this.editReminderInputLen = 0;
    // if command/ctrl key was not pressed
    } else {
      // if deleting characters
      if (event.key === 'Backspace' || event.key === 'Delete') {
        // decrement input length value if there are characters written out
        if (element.value.length) this.editReminderInputLen = element.value.length - 1;
      // if pressing any other key (a.k.a adding text)
      } else {
        // if key isn't Shift or a "dead" key and isComposing is false
        if (!(event.key === 'Shift' || event.key === 'Dead' || event.key === 'Enter' || event.isComposing)) this.editReminderInputLen = element.value.length + 1;
        // else (it's probably a dead key), keep length as is
        else this.editReminderInputLen = element.value.length;
      }
    }
    
    // if length is longer than the maximum allowed
    if (this.editReminderInputValue.length >= this.reminderService.MAX_LENGTH) {
      // revert string back to what it was at the maximum
      element.value = this.editReminderInputValue.slice(0, this.reminderService.MAX_LENGTH)
      // set edit reminder's input length to the maximum
      this.editReminderInputLen = this.reminderService.MAX_LENGTH;
    };
  }
}
