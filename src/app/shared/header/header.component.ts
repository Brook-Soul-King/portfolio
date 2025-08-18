import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, TranslateModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  isMenuOpen = false;
  isEnglish = false; // true = EN (checked), false = DE (unchecked)

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    const savedLang = localStorage.getItem('lang') || 'de';
    this.isEnglish = savedLang === 'en';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }

  ngAfterViewInit(): void {
    // Falls man direkt mit Fragment auf der Startseite landet
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.scrollToFragment(tree.fragment);
        }
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  visitStartpage() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    });
  }

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    const newLang = this.isEnglish ? 'en' : 'de';
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
    console.log("Sprache gewechselt zu:", newLang);
  }

  // -------------------------
  // NEU: Fragment Scroll mit festem Offset (Margin der Sektionen)
  // -------------------------
  scrollToFragment(fragment: string) {
    const el = document.getElementById(fragment);
    if (el) {
      // dynamische Margin auslesen
      const style = window.getComputedStyle(el);
      const marginTop = parseInt(style.marginTop || '0', 10);

      // absolute Position der Sektion
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;

      // Offset = Margin abziehen
      const offsetPosition = elementPosition - marginTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }


  navigateTo(fragment: string) {
    this.router.navigate(['/'], { fragment }).then(() => {
      // Kurzer Timeout, damit DOM vollständig gerendert ist
      setTimeout(() => this.scrollToFragment(fragment), 50);
    });
  }

}
