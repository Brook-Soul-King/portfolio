import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-three',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './section-three.component.html',
  styleUrl: './section-three.component.scss'
})
export class SectionThreeComponent {
  bubbleVisible = false;

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'de';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }

  toggleBubble() {
    this.bubbleVisible = !this.bubbleVisible;
  }
}
