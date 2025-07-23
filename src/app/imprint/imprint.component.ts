import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  visitImprint() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    document.addEventListener('mousemove', (e) => {
      const cursor = document.querySelector('.cursor') as HTMLElement;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    });
  }
}
