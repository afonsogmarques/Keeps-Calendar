import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkMode: boolean = localStorage.getItem('darkMode') && JSON.parse(localStorage.getItem('darkMode')!);

  constructor() { }

  toggleMode(value: boolean): boolean {
    // toggle darkMode value
    this.darkMode = value;
    // save current preference in localStorage
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    // return value
    return this.darkMode;
  }
  
  getCurMode(): boolean {
    return this.darkMode;
  }
}
