import { Component } from '@angular/core';

@Component({
  selector: 'app-section-six',
  standalone: true,
  imports: [],
  templateUrl: './section-six.component.html',
  styleUrl: './section-six.component.scss'
})
export class SectionSixComponent {
  focusInput(element: HTMLInputElement | HTMLTextAreaElement) {
    element.focus();
  }
}
