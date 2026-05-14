import {
  Component,
  HostListener,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DevWorkspaceComponent } from '../../components/dev-workspace/dev-workspace.component';
import { TechMarqueeComponent } from '../../components/tech-marquee/tech-marquee.component';
import { ScrambleTextComponent } from '../../components/scramble-text/scramble-text.component';
import { MagneticDirective } from '../../components/magnetic/magnetic.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DevWorkspaceComponent,
    TechMarqueeComponent,
    ScrambleTextComponent,
    MagneticDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly platform = inject(PLATFORM_ID);

  // tracked mouse for parallax on hero text
  readonly mx = signal(0);
  readonly my = signal(0);

  // featured 4 projects (matching the user's request: only these)
  readonly featured = [
    {
      id: 1,
      slug: 'interpretia',
      tag: 'PRODUCT',
      year: '2024',
      title: 'Interpretia',
      role: 'Frontend Lead · UI/UX',
      bg: '#7c3aed',
      desc: 'Re-diseño completo + dashboard con detección de discrepancias.',
    },
    {
      id: 2,
      slug: 'caminotravel',
      tag: 'PORTAL',
      year: '2024',
      title: 'CaminoTravel',
      role: 'Full-stack',
      bg: '#0ea5e9',
      desc: 'Plataforma de aplicación a empleos para una agencia.',
    },
    {
      id: 3,
      slug: 'hex',
      tag: 'BRAND',
      year: '2023',
      title: 'HeX',
      role: 'Diseño · Web',
      bg: '#ec4899',
      desc: 'Re-branding e identidad para una software factory.',
    },
    {
      id: 4,
      slug: 'nutricion',
      tag: 'APP',
      year: '2024',
      title: 'App de Nutrición',
      role: 'Mobile · Backend',
      bg: '#10b981',
      desc: 'App híbrida para gestión de pacientes y planes alimenticios.',
    },
  ];

  readonly stats = [
    { num: '03+', label: 'Años construyendo', sub: 'producción' },
    { num: '50+', label: 'Proyectos', sub: 'entregados' },
    { num: '12', label: 'Stacks', sub: 'dominados' },
    { num: '∞',  label: 'Café', sub: 'consumido' },
  ];

  readonly principles = [
    {
      no: '01',
      title: 'Detalle obsesivo',
      body: 'Cada pixel, cada milisegundo. La diferencia está en lo que casi nadie nota.',
    },
    {
      no: '02',
      title: 'Velocidad real',
      body: 'Performance no es una métrica de Lighthouse. Es respeto al usuario.',
    },
    {
      no: '03',
      title: 'Diseño funcional',
      body: 'Bonito sin propósito es decoración. Yo construyo herramientas.',
    },
    {
      no: '04',
      title: 'Iteración brutal',
      body: 'Lo entrego. Lo rompo. Lo reconstruyo. Hasta que es realmente bueno.',
    },
  ];

  @HostListener('document:mousemove', ['$event'])
  onMouse(e: MouseEvent) {
    if (!isPlatformBrowser(this.platform)) return;
    this.mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    this.my.set((e.clientY / window.innerHeight - 0.5) * 2);
  }
}
