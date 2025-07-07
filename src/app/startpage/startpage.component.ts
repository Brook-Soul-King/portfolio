import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SectionOneComponent } from './section-one/section-one.component';
import { SectionTwoComponent } from './section-two/section-two.component';
import { SectionThreeComponent } from './section-three/section-three.component';
import { SectionFourComponent } from './section-four/section-four.component';
import { SectionFiveComponent } from './section-five/section-five.component';
import { SectionSixComponent } from './section-six/section-six.component';


@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [
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

export class StartpageComponent {

}
