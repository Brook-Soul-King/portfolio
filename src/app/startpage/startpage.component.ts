import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SectionOneComponent } from './hero-section/section-one.component';
import { SectionTwoComponent } from './aboutMe-section/section-two.component';
import { SectionThreeComponent } from './skillSet-section/section-three.component';
import { SectionFourComponent } from './section-four/section-four.component';
import { SectionFiveComponent } from './coworker-section/section-five.component';
import { SectionSixComponent } from './contact-section/section-six.component';


@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SectionOneComponent,
    SectionTwoComponent,
    SectionThreeComponent,
    SectionFourComponent,
    SectionFiveComponent,
    SectionSixComponent],
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss'
})

export class StartpageComponent implements OnInit {
  ngOnInit(): void {
    document.addEventListener('mousemove', (e) => {
      const cursor = document.querySelector('.cursor') as HTMLElement;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    });
  }

  showScrollTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showScrollTop = scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


