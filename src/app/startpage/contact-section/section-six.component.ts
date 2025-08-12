import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-six',
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule, CommonModule],
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
    this.router.navigate(['/imprint']).then(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    });
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

  submittedSuccessfully = false;

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: () => {
            this.submittedSuccessfully = true;  // <-- hier setzen!
            ngForm.resetForm();
            // Optional: Erfolgsmeldung nach 3 Sekunden ausblenden
            setTimeout(() => this.submittedSuccessfully = false, 3000);
          },
          error: (error) => {
            console.error(error);
            this.submittedSuccessfully = false; // Optional
          }
        });
    }
  }

}
