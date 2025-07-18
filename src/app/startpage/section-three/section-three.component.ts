import { Component } from '@angular/core';

@Component({
  selector: 'app-section-three',
  standalone: true,
  imports: [],
  templateUrl: './section-three.component.html',
  styleUrl: './section-three.component.scss'
})
export class SectionThreeComponent {
  bubbleVisible = false;

  toggleBubble() {
    this.bubbleVisible = !this.bubbleVisible;
  }
}
