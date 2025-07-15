import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectDialogComponent } from '../section-four/project-dialog/project-dialog.component';

@Component({
  selector: 'app-section-four',
  standalone: true,
  imports: [CommonModule, ProjectDialogComponent],
  templateUrl: './section-four.component.html',
  styleUrl: './section-four.component.scss'
})
export class SectionFourComponent {
  hoveredProject: string | null = null;

  dialogVisible = false;
  dialogProjectTitle = '';
  dialogProjectDescription = '';

  projects = [
    {
      id: '01',
      title: 'Join',
      description: 'Aufgabenmanager inspiriert vom Kanban-System. Erstellen und organisieren Sie Aufgaben per Drag & Drop und weisen Sie Benutzer und Kategorien zu.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      image: './assets/img/project-join.png'
    },
    {
      id: '02',
      title: 'El pollo loco',
      description: 'Objektorientiertes Sprung-, Lauf- und Wurfspiel. Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um gegen die verrückte Henne zu kämpfen.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      image: './assets/img/project-pollo.png'
    },
    {
      id: '03',
      title: 'Pokédex',
      description: 'Ein interaktiver Pokédex mit Verbindung zu einer REST-API. Erkundet die große Welt der Pokemon und begebt euch auf eine nostalgische Reise.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'REST API'],
      image: './assets/img/project-pokedex.png'
    }
  ];


  setHoveredProject(projectName: string | null) {
    this.hoveredProject = projectName;
  }

  selectedProject: any = null;

  openDialog(project: any) {
    this.selectedProject = project;
    this.dialogVisible = true;
  }

  closeDialog = () => {
    this.dialogVisible = false;
  };
}
