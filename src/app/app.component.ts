import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.router.parseUrl(this.router.url).fragment;

        if (fragment) {
          this.scrollToFragment(fragment);
        }
      });

    // Auch Klicks auf Links zur gleichen URL + Fragment abfangen
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a') {
        const anchor = target as HTMLAnchorElement;
        const url = new URL(anchor.href, window.location.origin);

        if (url.pathname === window.location.pathname && url.hash) {
          event.preventDefault();
          this.scrollToFragment(url.hash.substring(1));
        }
      }
    });
  }

  private scrollToFragment(fragment: string) {
    const attemptScroll = (retries = 10) => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (retries > 0) {
        // Falls Element noch nicht existiert, kurz warten
        setTimeout(() => attemptScroll(retries - 1), 50);
      }
    };

    // Erst nach oben springen, damit die Berechnung stimmt
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    attemptScroll();
  }
}
