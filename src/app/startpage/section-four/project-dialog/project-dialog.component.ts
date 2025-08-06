import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss'
})
export class ProjectDialogComponent implements OnChanges {
  @Input() show = false;
  @Input() close!: () => void;
  @Input() next!: () => void;

  @Input() project!: {
    id: string;
    title?: string;
    description?: string;
    technologies?: any;
    image?: string;
  };

  translatedProject: any = {};

  constructor(private translate: TranslateService) { }

  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project?.id) {
      this.loadTranslation(this.project.id);
    }
  }

  private loadTranslation(id: string): void {
    const key = `sectionFour.projects`;

    // Wenn möglich, synchron laden (für performance)
    const allProjects = this.translate.instant(key);
    this.translatedProject = Object.values(allProjects).find((p: any) => p.id === id);

    // Falls nötig, dynamisch laden bei Sprachwechsel
    this.translate.onLangChange.subscribe(() => {
      const updated = this.translate.instant(key);
      this.translatedProject = Object.values(updated).find((p: any) => p.id === id);
    });
  }
}
