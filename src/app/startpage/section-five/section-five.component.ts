import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-five',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './section-five.component.html',
  styleUrl: './section-five.component.scss'
})
export class SectionFiveComponent implements OnInit {
  cards: { qoute: string, coworker: string }[] = [];

  visibleCards = 3;
  currentIndex = this.visibleCards;
  isAnimating = false;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.loadCards();
    this.translate.onLangChange.subscribe(() => this.loadCards());
  }

  loadCards(): void {
    this.translate.get('sectionFive.qoutes').subscribe((data: any) => {
      this.cards = Object.values(data);
    });
  }

  get gap(): number {
    return 72;
  }

  get extendedCards() {
    const clonesStart = this.cards.slice(-this.visibleCards);
    const clonesEnd = this.cards.slice(0, this.visibleCards);
    return [...clonesStart, ...this.cards, ...clonesEnd];
  }

  getCardWidth(): number {
    const width = window.innerWidth;
    if (width <= 768) return 290;
    if (width <= 1024) return 600;
    return 750;
  }

  // getSliderTransform(): { transform: string } {
  //   const cardWidth = this.getCardWidth();
  //   const totalCardWidth = cardWidth + this.gap;
  //   const offset = this.currentIndex * totalCardWidth;
  //   const centerOffset = (window.innerWidth / 2) - (cardWidth / 2);

  //   return {
  //     transform: `translateX(${-offset + centerOffset}px)`
  //   };
  // }

  getSliderTransform(): { transform: string } {
    const cardWidth = this.getCardWidth();
    const totalCardWidth = cardWidth + this.gap;

    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement;
    const containerWidth = sliderWrapper
      ? Math.min(sliderWrapper.offsetWidth, 2200) // Maximalbreite berücksichtigen
      : Math.min(window.innerWidth, 2200);

    const offset = this.currentIndex * totalCardWidth;
    const centerOffset = (containerWidth / 2) - (cardWidth / 2);

    return {
      transform: `translateX(${-offset + centerOffset}px)`
    };
  }

  next(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex++;

    setTimeout(() => {
      this.loopCheck();
      this.isAnimating = false;
    }, 400);
  }

  prev(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex--;

    setTimeout(() => {
      this.loopCheck();
      this.isAnimating = false;
    }, 400);
  }

  loopCheck(): void {
    const total = this.extendedCards.length;
    const clones = this.visibleCards;

    if (this.currentIndex >= total - clones) {
      this.disableTransitionTemporarily();
      this.currentIndex = clones;
    }

    if (this.currentIndex < clones) {
      this.disableTransitionTemporarily();
      this.currentIndex = total - clones - 1;
    }
  }

  disableTransitionTemporarily(): void {
    const slider = document.querySelector('.slider') as HTMLElement;
    if (!slider) return;

    slider.classList.add('no-transition');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slider.classList.remove('no-transition');
      });
    });
  }

  getRealIndex(): number {
    return (this.currentIndex - this.visibleCards + this.cards.length) % this.cards.length;
  }

  goTo(index: number): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.currentIndex = index + this.visibleCards;

    setTimeout(() => {
      this.loopCheck();
      this.isAnimating = false;
    }, 400);
  }
}
