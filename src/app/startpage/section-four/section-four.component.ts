import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectDialogComponent } from '../section-four/project-dialog/project-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-four',
  standalone: true,
  imports: [CommonModule, ProjectDialogComponent, TranslateModule],
  templateUrl: './section-four.component.html',
  styleUrl: './section-four.component.scss'
})
export class SectionFourComponent implements OnInit {
  hoveredProject: string | null = null;

  dialogVisible = false;
  selectedProject: any = null;
  projects: any[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadProjectsFromTranslation();

    // Nachladen bei Sprachwechsel
    this.translate.onLangChange.subscribe(() => {
      this.loadProjectsFromTranslation();
    });
  }

  loadProjectsFromTranslation(): void {
    const translation = this.translate.instant('sectionFour.projects');

    // Falls instant() leer zurückgibt, musst du get().subscribe verwenden
    this.projects = Object.values(translation);
  }

  setHoveredProject(projectName: string | null): void {
    this.hoveredProject = projectName;
  }

  openDialog(project: any): void {
    this.selectedProject = project;
    this.dialogVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closeDialog = (): void => {
    this.dialogVisible = false;
    document.body.style.overflow = 'auto';
  };

  nextProject = (): void => {
    if (!this.selectedProject) return;

    const currentIndex = this.projects.findIndex(p => p.id === this.selectedProject.id);
    const nextIndex = (currentIndex + 1) % this.projects.length;
    this.selectedProject = this.projects[nextIndex];
  };
}
