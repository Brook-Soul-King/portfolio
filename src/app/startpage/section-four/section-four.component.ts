import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-section-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-four.component.html',
  styleUrl: './section-four.component.scss'
})
export class SectionFourComponent {
  hoveredProject: string | null = null;

  setHoveredProject(projectName: string | null) {
    this.hoveredProject = projectName;
  }
}
