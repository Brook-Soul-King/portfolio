import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../section-four/project-dialog/project-dialog.component'; // Pfad anpassen!

@Component({
  selector: 'app-section-four',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './section-four.component.html',
  styleUrl: './section-four.component.scss'
})
export class SectionFourComponent {
  constructor(private dialog: MatDialog) { }
  hoveredProject: string | null = null;

  setHoveredProject(projectName: string | null) {
    this.hoveredProject = projectName;
  }

  openDialog(project: string): void {
    this.dialog.open(ProjectDialogComponent, {
      data: { project },
      panelClass: 'custom-dialog'
    });
  }
}
