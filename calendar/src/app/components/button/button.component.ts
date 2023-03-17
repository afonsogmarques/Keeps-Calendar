import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() displayText?: string;
  @Input() extraClasses?: string;
  @Input() icon?: string;
  @Input() iconPos?: string;
}
