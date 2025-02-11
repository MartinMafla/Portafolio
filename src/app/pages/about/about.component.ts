
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Technology {
  name: string;
  icon: string;
  level: number;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule]
})
export class AboutComponent {
  services: Service[] = [
    {
      icon: 'palette',
      title: 'UI/UX Design',
      description: 'Diseño interfaces intuitivas y experiencias de usuario excepcionales que cautivan y retienen usuarios.'
    },
    {
      icon: 'smartphone',
      title: 'App Development',
      description: 'Desarrollo aplicaciones móviles nativas y multiplataforma con las últimas tecnologías.'
    },
    {
      icon: 'code',
      title: 'Web Development',
      description: 'Creo sitios web responsivos y aplicaciones web modernas con alto rendimiento.'
    },
    {
      icon: 'search',
      title: 'SEO Optimization',
      description: 'Optimizo sitios web para mejorar su visibilidad en motores de búsqueda.'
    }
  ];

  technologies: Technology[] = [
    { name: 'Angular', icon: 'devicon-angular-plain', level: 90 },
    { name: 'React', icon: 'devicon-react-original', level: 85 },
    { name: 'Node.js', icon: 'devicon-nodejs-plain', level: 80 },
    { name: 'TypeScript', icon: 'devicon-typescript-plain', level: 85 }
  ];

  stats = [
    { number: '50+', label: 'Proyectos Completados' },
    { number: '3+', label: 'Años de Experiencia' },
    { number: '30+', label: 'Clientes Satisfechos' },
    { number: '100%', label: 'Compromiso' }
  ];
}