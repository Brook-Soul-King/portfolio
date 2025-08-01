import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-one',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './section-one.component.html',
  styleUrl: './section-one.component.scss'
})
export class SectionOneComponent {
  titles = [
    'Frontend Developer',
    'E-Commerce Manager',
    'Content-Manager',
  ];

  constructor(private translate: TranslateService) { }

  get repeatedTitles() {
    return [...this.titles, ...this.titles]; // oder sogar 3x für mehr Puffer
  }
}
