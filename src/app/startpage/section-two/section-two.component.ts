import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-two',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './section-two.component.html',
  styleUrl: './section-two.component.scss'
})
export class SectionTwoComponent {
  constructor(private translate: TranslateService) { }
}
