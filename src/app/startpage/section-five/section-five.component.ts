import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-section-five',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-five.component.html',
  styleUrl: './section-five.component.scss'
})
export class SectionFiveComponent {
  /**
   * Karteninhalte, die im Slider dargestellt werden.
   */
  cards = [
    {
      qoute: 'Lukas has proven to be a reliable group Partner. His technical skills and proactive approach were crucial to the success of our project.',
      coworker: 'Co Worker - Frontend Developer'
    },
    {
      qoute: 'Lukas has proven to be a reliable group Partner. His technical skills and proactive approach were crucial to the success of our project.',
      coworker: 'Co Worker - Frontend Developer'
    },
    {
      qoute: 'Lukas has proven to be a reliable group Partner. His technical skills and proactive approach were crucial to the success of our project.',
      coworker: 'Co Worker - Frontend Developer'
    },
    {
      qoute: 'Lukas has proven to be a reliable group Partner. His technical skills and proactive approach were crucial to the success of our project.',
      coworker: 'Co Worker - Frontend Developer'
    },
  ];

  /**
   * Anzahl gleichzeitig sichtbarer Karten.
   */
  visibleCards = 3;

  /**
   * Aktuell sichtbarer Index in der erweiterten Kartenliste.
   */
  currentIndex = this.visibleCards;

  /**
   * Gibt den horizontalen Abstand (Gap) zwischen den Karten zurück.
   */
  get gap(): number {
    return 72;
  }

  /**
   * Gibt an, ob aktuell eine Slide-Animation läuft.
   */
  isAnimating = false;

  /**
   * Hört auf Fenstergrößenänderungen und triggert die Neuberechnung der Position.
   */
  @HostListener('window:resize')
  onResize(): void {
    this.currentIndex = this.currentIndex;
  }

  /**
   * Gibt die vollständige Liste der anzuzeigenden Karten zurück, inkl. Klone am Anfang und Ende für die Endlosrotation.
   */
  get extendedCards() {
    const clonesStart = this.cards.slice(-this.visibleCards);
    const clonesEnd = this.cards.slice(0, this.visibleCards);
    return [...clonesStart, ...this.cards, ...clonesEnd];
  }

  /**
   * Bestimmt die Breite einer Karte basierend auf der Fensterbreite.
   */
  getCardWidth(): number {
    const width = window.innerWidth;
    if (width <= 768) return 290;
    if (width <= 1024) return 600;
    return 750;
  }

  /**
   * Berechnet den CSS-Transform-Stil für die horizontale Positionierung des Sliders.
   */
  getSliderTransform(): { transform: string } {
    const cardWidth = this.getCardWidth();
    const totalCardWidth = cardWidth + this.gap;
    const offset = this.currentIndex * totalCardWidth;
    const centerOffset = (window.innerWidth / 2) - (cardWidth / 2);

    return {
      transform: `translateX(${-offset + centerOffset}px)`
    };
  }

  /**
   * Navigiert zur nächsten Karte.
   */
  next(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex++;

    setTimeout(() => {
      this.loopCheck();
      this.isAnimating = false;
    }, 400);
  }

  /**
   * Navigiert zur vorherigen Karte.
   */
  prev(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex--;

    setTimeout(() => {
      this.loopCheck();
      this.isAnimating = false;
    }, 400);
  }

  /**
   * Überprüft nach der Animation, ob der Slider in einem geklonten Bereich angekommen ist,
   * und springt bei Bedarf zurück zur originalen Position für einen nahtlosen Loop.
   */
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

  /**
   * Deaktiviert temporär die CSS-Transition für einen „unsichtbaren“ Positionswechsel.
   */
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

  /**
   * Gibt den echten Index der aktuell sichtbaren Karte zurück, bezogen auf die Originaldaten (ohne Klone).
   */
  getRealIndex(): number {
    return (this.currentIndex - this.visibleCards + this.cards.length) % this.cards.length;
  }

  /**
   * Springt durch Klick auf einen Dot zur entsprechenden Karte.
   * @param index Index der Zielkarte im Originalkarten-Array
   */
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
