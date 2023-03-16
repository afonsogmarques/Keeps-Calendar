import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { DayComponent } from './components/day/day.component';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { MonthPipe } from './pipes/month.pipe';
import { DateStringPipe } from './pipes/date-string.pipe';
import { ReminderComponent } from './components/reminder/reminder.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    DayComponent,
    ModalComponent,
    ButtonComponent,
    MonthPipe,
    DateStringPipe,
    ReminderComponent,
    AlertComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
