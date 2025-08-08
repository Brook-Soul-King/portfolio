import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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

  http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: ""
  };

  constructor(private translate: TranslateService, private router: Router) { }

  focusInput(element: HTMLInputElement | HTMLTextAreaElement) {
    element.focus();
  }

  visitImprint() {
    this.router.navigate(['/imprint']);
  }

  post = {
    endPoint: 'https://lukas-schroeer.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {

            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    }
  }
}
