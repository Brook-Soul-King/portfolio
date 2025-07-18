import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss'
})
export class ProjectDialogComponent {
  @Input() show = false;
  @Input() close!: () => void;
  @Input() next!: () => void;

  @Input() project!: {
    id: string;
    title: string;
    description: string;
    technologies?: string[];
    image?: string;
  };

}
