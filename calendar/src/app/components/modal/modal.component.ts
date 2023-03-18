import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ReminderService } from 'src/app/services/reminderService/reminder.service';
import { DateService } from 'src/app/services/dateService/date.service';
import { Reminder } from 'src/app/interfaces/reminder';
import { Tag } from 'src/app/interfaces/tag';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() modalEvent = new EventEmitter<Event>();
  @Output() editReminderEvent = new EventEmitter<Event>();

  @Input() curDate: any = this.dateService.curDate;

  // couldn't figure out how to use material icons in select options, so this was a goofy workaround
  tags: Tag[] = [
    { color: '🟢', value: 'green'},
    { color: '🔵', value: 'blue'},
    { color: '🟡', value: 'yellow'},
    { color: '🟠', value: 'orange'},
    { color: '🔴', value: 'red'},
  ]

  randomPlaceholders: string[] = [
    'Meeting with stakeholders',
    'Walk Bobby',
    'Water the plants',
    'Doctor\'s appointment',
    'Monthly grocery shopping',
    'Pick-up the kids from school',
    'Car inspection',
    'Project deadline'
  ];

  darkMode: boolean = this.darkModeService.getCurMode();

  randomPlaceholder: string = this.randomPlaceholders[Math.floor(Math.random() * this.randomPlaceholders.length)];

  addReminderOpen: boolean = false;
  prevReminderInputValue: string = '';
  newReminderInputValue: string = '';
  newReminderTimeValue?: string;
  newReminderTagValue?: string;

  newInputReminderLen: number = 0;

  reminders: Reminder[] = this.reminderService.getDayReminders(this.curDate.day, this.curDate.monthIndex, this.curDate.year);

  constructor(
    private reminderService:ReminderService,
    public dateService:DateService,
    public darkModeService:DarkModeService
  ) {
  }

  ngOnInit(): void {
    document.addEventListener('keydown', (e) => {
      // if key pressed was not Escape, return early
      if (!(e.key === 'Escape')) return;

      // else, get element from DOM
      const element = document.getElementsByTagName('app-modal')[0];

      // if element doesn't contain class 'hidden' (which means it's open), add it in order to conceal it once again
      !element.classList.contains('hidden') && element.classList.add('hidden');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if changes to current date have been made, update local reminders
    if (changes['curDate'] && changes['curDate'].previousValue !== changes['curDate'].currentValue) {
      // update curDate locally
      this.curDate = changes['curDate'].currentValue;
      // update reminder locally
      this.reminders = this.reminderService.getDayReminders(this.curDate.day, this.curDate.monthIndex, this.curDate.year);
    }
  };

  toggleModal(): void {
    // emit click out of modal box bounds
    this.modalEvent.emit();
    // toggle addReminderOpen
    this.addReminderOpen = false;
  };

  // toggle form
  handleAddReminder(): void {
    // regenerate placeholder
    this.randomPlaceholder = this.randomPlaceholders[Math.floor(Math.random() * this.randomPlaceholders.length)];
    
    // if closing dial
    if (this.addReminderOpen) {
      // clear inputs
      this.newReminderInputValue = '';
      this.newReminderTagValue = '';
      this.newReminderTimeValue = '';
      // reset input character length
      this.newInputReminderLen = 0;
    }

    // set tag value to initial value because for some reason html "value" attribute wasn't working
    this.newReminderTagValue = '';

    // toggle input visibility
    this.addReminderOpen = !this.addReminderOpen;

    // update reminder locally
    this.reminders = this.reminderService.getDayReminders(this.curDate.day, this.curDate.monthIndex, this.curDate.year);
  };

  addNewReminder(value: string): void {
    // if nothing is written
    if (!value) {
      // get reminder input's parent element
      const element = document.getElementById('newReminder')!.parentElement;
      // display red border as warning
      this.displayRedBorder(element);
      // and return early
      return;
    }

    // if time value hasn't been selected
    if (!this.newReminderTimeValue) {
      // get time input
      const element = document.getElementById('timePicker')
      // display red border as warning
      this.displayRedBorder(element);
      // and return early
      return;
    }

    // return if reminder is 31 chars or longer
    if (value.length > 30) return;

    // else, add reminder
    this.reminderService.addReminder({
      id: this.reminderService.generateId(),
      date: {
        day: this.curDate.day,
        monthIndex: this.curDate.monthIndex,
        year: this.curDate.year,
        time: this.newReminderTimeValue,
      },
      tag: this.newReminderTagValue ?? '',
      body: value,
    })

    // clear inputs
    this.newReminderInputValue = '';
    this.newReminderTagValue = '';
    this.newReminderTimeValue = '';

    // update reminders locally
    this.reminders = this.reminderService.getDayReminders(this.curDate.day, this.curDate.monthIndex, this.curDate.year);

    // emit edit reminders event for parent components
    this.updateReminders();

    // reset input length count to 0
    this.newInputReminderLen = 0;
  }

  // if enter is pressed, delegate task to addNewReminder()
  onEnterReminder(event: any): void {
    this.addNewReminder(event.target.value);
  }

  checkReminderLength(event: KeyboardEvent): void {
    // find element
    const element = (<HTMLInputElement>document.getElementById('newReminder'));
    
    // Welcome to indentation hell to keep track of input length 
    // (many edge cases here were not accounted for due to lack of time, e.g. mouse selecting a chunk of text and deleting it)
    // if command/ctrl key is pressed
    if (event.metaKey) {
      // if deleting characters, reset input length to 0
      if (event.key === 'Backspace' || event.key === 'Delete') this.newInputReminderLen = 0;

    // if command/ctrl key was not pressed
    } else {
      // if deleting characters
      if (event.key === 'Backspace' || event.key === 'Delete') {
        // decrement input length value
        if (element.value.length) this.newInputReminderLen = element.value.length - 1;
      // if pressing any other key (a.k.a adding text)
      } else {
        // if key isn't Shift or a "dead" key and isComposing is false
        if (!(event.key === 'Shift' || event.key === 'Dead' || event.key === "Enter" || event.isComposing)) this.newInputReminderLen = element.value.length + 1;
        // else (it's probably a dead key), keep length as is
        else this.newInputReminderLen = element.value.length;
      }
    }

    // if length is longer than 30 and set length back to 30 as well
    if (this.newReminderInputValue.length >= this.reminderService.MAX_LENGTH) {
      // revert string back to what it was at max. 30 characters
      element.value = this.newReminderInputValue.slice(0, this.reminderService.MAX_LENGTH);
      // set edit reminder's input length to the maximum
      this.newInputReminderLen = this.reminderService.MAX_LENGTH;
    };
  }
  
  updateReminders(): void {
    // update reminders locally
    this.reminders = this.reminderService.getDayReminders(this.curDate.day, this.curDate.monthIndex, this.curDate.year);
    // emit edit reminders event for parent components
    this.editReminderEvent.emit();
  }

  displayRedBorder(element: HTMLElement | null) {
    // remove previous border class
    element?.classList.remove(this.darkMode ? 'dark:border-slate-400' : 'border-slate-400');
    // display red border under input
    element?.classList.add('border-red-400');
  }
}