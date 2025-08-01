import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  isMenuOpen = false;
  isEnglish = false; // true = EN (checked), false = DE (unchecked)

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'de';
    this.isEnglish = savedLang === 'en';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  reload() {
    window.location.reload();
  }

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    const newLang = this.isEnglish ? 'en' : 'de';
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
    console.log("Sprache gewechselt zu:", newLang);
  }
}

