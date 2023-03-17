import { Component } from '@angular/core';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Keeps Calendar';

  darkMode: boolean = this.darkModeService.getCurMode();

  constructor(private darkModeService:DarkModeService) {}

  toggleDarkMode(event: boolean): void {
    this.darkMode = event;
    // update dark mode in service
    this.darkModeService.toggleMode(this.darkMode);
  }
}
