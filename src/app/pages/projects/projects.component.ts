import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectDetailsComponent } from '../../components/project-details/project-details.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    ProjectDetailsComponent
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = [
    {
      id: 1,
      title: 'U-Learn',
      description: 'Una aplicación híbrida con el propósito de ayudar y enseñar a estudiantes de la USFQ sobre materías o temas que no entiendan.',
      image: '/assets/images/mockups.png',
      technologies: ['Angular', 'Typescript', 'Firebase', 'Ionic']
    },
    {
      id: 2,
      title: 'TechBy',
      description: 'Un e-commerce web enfocado para las personas como diseñadores o desarrolladores que quieran comprar productos buenos.',
      image: '/assets/images/dashboardtechby.png',
      technologies: ['React', 'Typescript', 'Node', 'Express', 'MongoDB']
    },
    {
      id: 3,
      title: 'Interpretia',
      description: 'Re diseño de toda la aplicación y encargado del Front y funcionalidad en el dashboard.',
      image: '/assets/images/interpretia-banner.png',
      technologies: ['Angular', 'Figma', 'PrimeNG', 'Typescript', 'MySQL', 'Python']
    },
    {
      id: 4,
      title: 'CaminoTravel',
      description: 'Portal donde postulantes puedan aplicar a trabajos de la empresa Camino.',
      image: '/assets/images/caminotravel.png',
      technologies: ['Angular', 'Typescript', 'Node', 'Deno', 'MySQL', 'PrimeNG']
    },
    {
      id: 5,
      title: 'HeX',
      description: 'Re diseño de toda su web inicial para mostrarse como marca en el mercado.',
      image: '/assets/images/hex.png',
      technologies: ['Figma', 'Adobe XD', 'LordIcon', 'FreePik', 'Adobe Illustrator', 'Wordpress']
    },
    {
      id: 6,
      title: 'App de Nutrición',
      description: 'Aplicación híbdrida para el manejo de pacientes de una nutricionista.',
      image: '/assets/images/nutricionapp.png',
      technologies: ['Angular', 'Typescript', 'Node', 'Deno', 'MongoDB', 'PrimeNG', 'MaterialDesign']
    },
    {
      id: 7,
      title: 'Fortia',
      description: 'Pagina web para una empresa de consultorías.',
      image: '/assets/images/fortia.png',
      technologies: ['Figma', 'Wordpress']
    },
    {
      id: 8,
      title: 'XCore, Xlead',
      description: 'Re diseño y desarrollo del front de nuevas aplicaciones en la empresa que trabajo.',
      image: '/assets/images/hexapps.png',
      technologies: ['React', 'Typescript', 'Figma']
    },
    
  ];

  constructor(private router: Router) {}

  openProjectDetails(project: any) {
    this.router.navigate(['/projects', project.id]);
  }
}