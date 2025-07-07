import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-section-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-one.component.html',
  styleUrl: './section-one.component.scss'
})
export class SectionOneComponent {
  titles = [
    'Frontend-Entwickler',
    'Kaufmann im E-Commerce',
    'Content-Manager',
  ];

  get repeatedTitles() {
    return [...this.titles, ...this.titles]; // oder sogar 3x für mehr Puffer
  }
}
