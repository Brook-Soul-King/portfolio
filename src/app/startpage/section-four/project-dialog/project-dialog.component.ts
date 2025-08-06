import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

const PROJECT_LINKS: Record<string, { urlGit: string; urlP: string }> = {
  '01': {
    urlGit: 'https://github.com/Brook-Soul-King/join',
    urlP: 'https://www.lukas-schroeer.developerakademie.net/join/login/login.html'
  },
  '02': {
    urlGit: 'https://github.com/Brook-Soul-King/El_Pollo_Loco',
    urlP: 'https://www.lukas-schroeer.developerakademie.net/Z_EL_POLLO_LOCO_2/index.html'
  },
  '03': {
    urlGit: 'https://github.com/Brook-Soul-King/pokedex',
    urlP: 'https://www.lukas-schroeer.developerakademie.net/pokedex/index.html'
  }
};

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss'
})
export class ProjectDialogComponent implements OnChanges, OnDestroy {
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
  private langChangeSub?: Subscription;

  constructor(private translate: TranslateService) {
    // Sprachwechsel abonnieren
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadTranslation();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project?.id) {
      this.loadTranslation();
    }
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
  }

  // Getter für die URLs basierend auf Projekt-ID
  get urlGit(): string {
    return PROJECT_LINKS[this.project?.id ?? '']?.urlGit ?? '#';
  }

  get urlP(): string {
    return PROJECT_LINKS[this.project?.id ?? '']?.urlP ?? '#';
  }

  openLink(url: string): void {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  }

  private loadTranslation(): void {
    if (!this.project?.id) {
      this.translatedProject = {};
      return;
    }

    this.translate.get('sectionFour.projects').subscribe((allProjects: any) => {
      const projectsArray = Object.values(allProjects);
      this.translatedProject = projectsArray.find((p: any) => p.id === this.project.id) || {};
    });
  }
}
