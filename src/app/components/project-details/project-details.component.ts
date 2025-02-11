import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  coverImage: string;
  date: Date;
  category: string;
  technologies: string[];
  features?: string[];
  details?: {
    plataforma: string;
    estado: string;
    audiencia: string;
    precio: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}



@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project!: ProjectDetail;
  projectDetails = [
    { label: 'Plataforma', value: 'Web & Móvil' },
    { label: 'Estado', value: 'En desarrollo' },
    { label: 'Audiencia', value: 'Estudiantes universitarios' },
    { label: 'Precio', value: '$5/mes' }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProjectDetails(id);
    });
  }

  loadProjectDetails(id: string) {
    this.project = {
      id: 1,
      title: 'U-learn',
      description: 'Aplicación híbrida para tutorías estudiantiles',
      longDescription: 'La aplicación U-learn será una herramienta para el Learning Center que ya existe en la Universidad San Francisco de Quito, y por ende la paga de los tutores seguirá siendo por parte de la Universidad, la app se encarga de brindar por donde tener las reuniones, documentación profunda y revisada por profesionales de cualquier clase, y eventos. Nosotros como empresas encontraremos eventos de todo tipo de carreras, ya sean dentro de la Universidad San Francisco o afuera, creando conexiones y brindando la mejor experiencia para los usuarios.',
      coverImage: '/assets/images/mockups.png',
      date: new Date(),
      category: 'Aplicación Híbrida',
      technologies: ['Angular', 'TypeScript', 'Ionic', 'Firebase', 'Node.js'],
      features: [
        'Sistema de tutorías en línea',
        'Documentación académica verificada',
        'Gestión de eventos académicos',
        'Sistema de subscripción mensual',
        'Integración con pasarelas de pago',
        'Reuniones virtuales en tiempo real',
        'Recursos educativos verificados'
      ],
      details: {
        plataforma: 'Web & Móvil',
        estado: 'En desarrollo',
        audiencia: 'Estudiantes universitarios',
        precio: '$5/mes'
      }
    };
  }

  openGalleryImage(imageUrl: string) {
    console.log('Opening image:', imageUrl);
  }

  goBack() {
    this.location.back();
  }
}