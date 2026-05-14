import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MagneticDirective } from '../../components/magnetic/magnetic.directive';

interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  status: 'live' | 'archive' | 'concept';
  category: 'web-app' | 'branding' | 'mobile' | 'dashboard';
  cover: string;
  thumb: string;
  tech: string[];
  accent: string;
  size: 'lg' | 'md' | 'sm';
}

type FilterId = 'all' | 'web-app' | 'branding' | 'mobile' | 'dashboard';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, MagneticDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  filter = signal<FilterId>('all');
  hoveredId = signal<number | null>(null);

  filters: { id: FilterId; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'web-app', label: 'Web Apps' },
    { id: 'dashboard', label: 'Dashboards' },
    { id: 'branding', label: 'Branding' },
    { id: 'mobile', label: 'Mobile' }
  ];

  projects: Project[] = [
    {
      id: 1,
      slug: 'interpretia',
      title: 'Interpretia',
      tagline: 'Plataforma para intérpretes profesionales',
      description: 'Re-diseño completo del sistema y desarrollo del dashboard para gestión de postulaciones e intérpretes.',
      year: '2024',
      role: 'Frontend Lead · UI/UX',
      status: 'live',
      category: 'dashboard',
      cover: 'assets/images/interpretia/dashboard-inicial.png',
      thumb: 'assets/images/interpretia-banner.png',
      tech: ['Angular', 'TypeScript', 'PrimeNG', 'MySQL', 'Python', 'Figma'],
      accent: '#7c5fff',
      size: 'lg'
    },
    {
      id: 2,
      slug: 'caminotravel',
      title: 'CaminoTravel',
      tagline: 'Portal de aplicación a empleos',
      description: 'Plataforma donde postulantes pueden aplicar a vacantes con experiencia fluida y panel administrativo.',
      year: '2023',
      role: 'Fullstack Developer',
      status: 'live',
      category: 'web-app',
      cover: 'assets/images/caminotravel/home-camino.png',
      thumb: 'assets/images/caminotravel.png',
      tech: ['Angular', 'TypeScript', 'Node', 'Deno', 'MySQL', 'PrimeNG'],
      accent: '#67e8f9',
      size: 'lg'
    },
    {
      id: 3,
      slug: 'hex',
      title: 'HeX',
      tagline: 'Re-branding de fábrica de software',
      description: 'Re-diseño completo de identidad visual y sitio web corporativo para mostrar la marca en el mercado.',
      year: '2023',
      role: 'Brand & Web Designer',
      status: 'live',
      category: 'branding',
      cover: 'assets/images/hex/home-hex.png',
      thumb: 'assets/images/hex.png',
      tech: ['Figma', 'Adobe XD', 'Illustrator', 'Wordpress'],
      accent: '#c084fc',
      size: 'lg'
    },
    {
      id: 4,
      slug: 'nutricion',
      title: 'App de Nutrición',
      tagline: 'Aplicación híbrida para nutricionistas',
      description: 'App móvil para gestión integral de pacientes: agenda, comunidad y planes alimenticios.',
      year: '2022',
      role: 'Mobile Developer',
      status: 'archive',
      category: 'mobile',
      cover: 'assets/images/nutricionapp/homepage-nutri.png',
      thumb: 'assets/images/nutricionapp.png',
      tech: ['Angular', 'Ionic', 'Node', 'MongoDB', 'PrimeNG'],
      accent: '#ec4899',
      size: 'lg'
    }
  ];

  filtered = computed(() => {
    const f = this.filter();
    if (f === 'all') return this.projects;
    return this.projects.filter(p => p.category === f);
  });

  setFilter(id: FilterId) {
    this.filter.set(id);
  }

  setHover(id: number | null) {
    this.hoveredId.set(id);
  }
}
