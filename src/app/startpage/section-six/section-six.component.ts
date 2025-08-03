import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-six',
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule],
  templateUrl: './section-six.component.html',
  styleUrl: './section-six.component.scss'
})
export class SectionSixComponent {
  constructor(private translate: TranslateService, private router: Router) { }

  focusInput(element: HTMLInputElement | HTMLTextAreaElement) {
    element.focus();
  }

  visitImprint() {
    this.router.navigate(['/imprint']);
  }
}
