import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MagneticDirective } from '../magnetic/magnetic.directive';

interface Section {
  number: string;
  label: string;
  title: string;
  body: string[];
}

interface Metric {
  value: string;
  label: string;
}

interface ProjectDetail {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  year: string;
  client: string;
  role: string;
  duration: string;
  team: string;
  status: 'live' | 'archive' | 'concept';
  url?: string;
  category: string;
  cover: string;
  banner: string;
  gallery: string[];
  tech: string[];
  accent: string;
  metrics: Metric[];
  intro: string;
  challenge: string[];
  solution: string[];
  process: string[];
  outcome: string[];
  reflection: string;
  next: { slug: string; title: string };
  prev: { slug: string; title: string };
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MagneticDirective],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  scrollY = signal(0);
  private scrollListener?: () => void;

  projects: ProjectDetail[] = [
    {
      id: 1,
      slug: 'interpretia',
      title: 'Interpretia',
      tagline: 'Reimaginando la gestión de intérpretes profesionales',
      year: '2024',
      client: 'Interpretia · Plataforma B2B',
      role: 'Frontend Lead · UI/UX Designer',
      duration: '6 meses',
      team: '4 personas',
      status: 'live',
      url: 'https://interpretia.com',
      category: 'Dashboard · Web App',
      cover: 'assets/images/interpretia/dashboard-inicial.png',
      banner: 'assets/images/interpretia-banner.png',
      gallery: [
        'assets/images/interpretia/dashboard-inicial.png',
        'assets/images/interpretia/form-ventana.png',
        'assets/images/interpretia/popup-calendario.png',
        'assets/images/interpretia/meethub.png',
        'assets/images/interpretia/discrepancia-pin.png'
      ],
      tech: ['Angular 17', 'TypeScript', 'PrimeNG', 'MySQL', 'Python', 'Figma', 'SCSS'],
      accent: '#7c5fff',
      metrics: [
        { value: '+45%', label: 'Velocidad de gestión' },
        { value: '8/10', label: 'Score de UX' },
        { value: '20+', label: 'Pantallas rediseñadas' },
        { value: '0', label: 'Bugs en producción' }
      ],
      intro: 'Interpretia es una plataforma B2B para gestión de intérpretes profesionales. Cuando entré al proyecto, el sistema funcionaba pero la experiencia de usuario era pesada: formularios largos, navegación poco intuitiva y un dashboard que mostraba datos sin priorizar.',
      challenge: [
        'El dashboard original mostraba toda la información sin priorizar — los administradores tardaban demasiado en encontrar lo importante.',
        'Los formularios de postulación tenían 30+ campos en una sola vista, generando una tasa de abandono alta.',
        'No había sistema de diseño consistente: cada módulo se sentía como un producto distinto.'
      ],
      solution: [
        'Rediseñé el dashboard con jerarquía clara: KPIs arriba, alertas accionables al centro, tablas detalladas abajo.',
        'Dividí los formularios largos en pasos progresivos con auto-guardado y validación inline.',
        'Construí un design system completo en Figma + tokens en SCSS, asegurando coherencia visual y accesibilidad WCAG AA.'
      ],
      process: [
        'Investigación con usuarios reales (administradores e intérpretes) durante 2 semanas.',
        'Wireframes de baja fidelidad → prototipos en Figma → testing con stakeholders.',
        'Implementación en Angular con PrimeNG personalizado + SCSS modular.',
        'QA y handoff progresivo al equipo de desarrollo.'
      ],
      outcome: [
        'Reducción del 45% en tiempo promedio para gestionar postulaciones.',
        'Tasa de completitud de formularios subió del 60% al 89%.',
        'Sistema de diseño usado ahora en 3 productos paralelos del mismo cliente.'
      ],
      reflection: 'Este proyecto reforzó mi creencia de que un buen diseño no es decoración — es claridad. Cuando reduces la fricción cognitiva, todo lo demás fluye.',
      next: { slug: 'caminotravel', title: 'CaminoTravel' },
      prev: { slug: 'nutricion', title: 'App de Nutrición' }
    },
    {
      id: 2,
      slug: 'caminotravel',
      title: 'CaminoTravel',
      tagline: 'Portal de empleos con experiencia fluida',
      year: '2023',
      client: 'Camino · Empresa de turismo',
      role: 'Fullstack Developer',
      duration: '4 meses',
      team: '3 personas',
      status: 'live',
      category: 'Web App · Portal',
      cover: 'assets/images/caminotravel/home-camino.png',
      banner: 'assets/images/caminotravel.png',
      gallery: [
        'assets/images/caminotravel/home-camino.png',
        'assets/images/caminotravel/jobs.png',
        'assets/images/caminotravel/application.png',
        'assets/images/caminotravel/profile-camino.png',
        'assets/images/caminotravel/login-camino.png'
      ],
      tech: ['Angular', 'TypeScript', 'Node.js', 'Deno', 'MySQL', 'PrimeNG', 'JWT'],
      accent: '#67e8f9',
      metrics: [
        { value: '+60%', label: 'Aplicaciones completadas' },
        { value: '<2s', label: 'Tiempo de carga' },
        { value: '4', label: 'Roles de usuario' },
        { value: '100%', label: 'Mobile-friendly' }
      ],
      intro: 'CaminoTravel necesitaba un portal donde candidatos pudieran aplicar a vacantes y el equipo de RRHH gestionara todo el flujo. Construí la solución completa de cero: frontend, backend y diseño.',
      challenge: [
        'No existía un sistema previo — había que arrancar de cero el flujo completo.',
        'Múltiples roles con permisos distintos: candidato, recruiter, manager y admin.',
        'Necesidad de manejar archivos pesados (CVs en PDF) sin afectar performance.'
      ],
      solution: [
        'Arquitectura modular en Angular con lazy loading por rol de usuario.',
        'Backend en Node.js + Deno con MySQL y autenticación JWT con refresh tokens.',
        'Sistema de upload con compresión client-side y storage optimizado en CDN.'
      ],
      process: [
        'Definición de user stories y flujos por rol con el equipo de RRHH.',
        'Diseño en Figma de las pantallas principales y prototipo navegable.',
        'Desarrollo iterativo con sprints semanales y demos al cliente.',
        'Lanzamiento progresivo: primero candidatos, luego administración.'
      ],
      outcome: [
        '+60% en tasa de finalización del proceso de aplicación.',
        'Reducción del 70% en tiempo de respuesta a candidatos.',
        'Sistema activo con +500 aplicaciones procesadas en el primer mes.'
      ],
      reflection: 'Construir el frontend y backend de un sistema completo te enseña a pensar en la totalidad del producto, no solo en la capa que ves.',
      next: { slug: 'hex', title: 'HeX' },
      prev: { slug: 'interpretia', title: 'Interpretia' }
    },
    {
      id: 3,
      slug: 'hex',
      title: 'HeX',
      tagline: 'Re-branding completo de fábrica de software',
      year: '2023',
      client: 'HEX · Software Factory (donde fui Tech Lead)',
      role: 'Brand Designer · Web Designer',
      duration: '3 meses',
      team: '2 personas',
      status: 'live',
      category: 'Branding · Web Design',
      cover: 'assets/images/hex/home-hex.png',
      banner: 'assets/images/hex.png',
      gallery: [
        'assets/images/hex/home-hex.png',
        'assets/images/hex/services-hex.png',
        'assets/images/hex/portafolio-hex.png',
        'assets/images/hex/about-hex.png',
        'assets/images/hex/contact-hex.png'
      ],
      tech: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Wordpress', 'LordIcon', 'CSS'],
      accent: '#c084fc',
      metrics: [
        { value: '5', label: 'Pantallas diseñadas' },
        { value: '12', label: 'Iconos custom' },
        { value: '100%', label: 'Identidad nueva' },
        { value: '∞', label: 'Iteraciones' }
      ],
      intro: 'HeX necesitaba presentarse al mercado como una marca seria de fábrica de software. Su identidad anterior se sentía amateur. Mi rol fue construir desde cero la identidad visual y aplicarla en su sitio web corporativo.',
      challenge: [
        'Identidad visual inconsistente entre colaterales, redes y sitio web.',
        'Mensaje de marca poco claro: ¿qué hacen exactamente?',
        'Sitio web técnicamente limitado por uso de Wordpress sin personalización.'
      ],
      solution: [
        'Re-diseño del logo manteniendo la X como símbolo, pero con geometría más fuerte y proporcional.',
        'Sistema de color basado en violetas profundos + acentos de neón.',
        'Diseño web modular con bloques reutilizables que el cliente puede mantener.'
      ],
      process: [
        'Workshop de marca con el equipo fundador para entender propuesta de valor.',
        'Mood boards y exploración de dirección visual.',
        'Sistema completo: logo, paleta, tipografías, iconografía, ilustración.',
        'Aplicación en sitio web responsive y handoff a desarrollador WordPress.'
      ],
      outcome: [
        'Marca con identidad clara y memorable en su industria.',
        'Sitio web 3x más rápido que la versión anterior.',
        'Mensaje de marca consistente en todos los puntos de contacto.'
      ],
      reflection: 'El branding no es solo el logo — es la sensación que genera la marca cada vez que alguien la encuentra. Y eso vive en cada detalle.',
      next: { slug: 'nutricion', title: 'App de Nutrición' },
      prev: { slug: 'caminotravel', title: 'CaminoTravel' }
    },
    {
      id: 4,
      slug: 'nutricion',
      title: 'App de Nutrición',
      tagline: 'App móvil híbrida para nutricionistas',
      year: '2022',
      client: 'Consulta nutricional privada',
      role: 'Mobile Developer',
      duration: '5 meses',
      team: '2 personas',
      status: 'archive',
      category: 'Mobile App · Healthcare',
      cover: 'assets/images/nutricionapp/homepage-nutri.png',
      banner: 'assets/images/nutricionapp.png',
      gallery: [
        'assets/images/nutricionapp/homepage-nutri.png',
        'assets/images/nutricionapp/calendario-nutri.png',
        'assets/images/nutricionapp/info-nutri.png',
        'assets/images/nutricionapp/comunidad-chat.png',
        'assets/images/nutricionapp/login-nutri.png'
      ],
      tech: ['Angular', 'Ionic', 'Node.js', 'MongoDB', 'PrimeNG', 'Material Design'],
      accent: '#ec4899',
      metrics: [
        { value: '4', label: 'Módulos principales' },
        { value: 'iOS+Android', label: 'Plataformas' },
        { value: 'Real-time', label: 'Chat comunidad' },
        { value: 'Offline', label: 'Soporte parcial' }
      ],
      intro: 'Una nutricionista necesitaba digitalizar su práctica: agendar citas, gestionar planes alimenticios, mantener comunidad activa. Construí la app móvil híbrida desde cero usando Ionic + Angular.',
      challenge: [
        'Nutricionista solo manejaba pacientes vía WhatsApp y Excel — proceso totalmente manual.',
        'Necesidad de funcionar offline para consultas en zonas con mala conectividad.',
        'Sistema de chat en tiempo real para comunidad sin infraestructura previa.'
      ],
      solution: [
        'App híbrida en Ionic + Angular con build para iOS y Android desde un mismo código.',
        'Calendario integrado con Google Calendar para sincronización bidireccional.',
        'Chat en tiempo real con Socket.io + soporte offline con caché local.'
      ],
      process: [
        'Entrevistas con la nutricionista y 5 pacientes para entender pain points.',
        'Prototipo navegable en Figma con flujos completos.',
        'Desarrollo iterativo con beta testing entre pacientes seleccionados.',
        'Publicación en App Store y Google Play.'
      ],
      outcome: [
        'Reducción del 80% en tiempo de gestión de citas.',
        'Comunidad activa con engagement diario entre pacientes.',
        'Validación de modelo para escalar a más profesionales de salud.'
      ],
      reflection: 'Construir para healthcare te obliga a pensar en accesibilidad, privacidad y confianza desde el primer prototipo.',
      next: { slug: 'interpretia', title: 'Interpretia' },
      prev: { slug: 'hex', title: 'HeX' }
    }
  ];

  // Find current project by slug
  project = computed(() => {
    const slug = this.route.snapshot.paramMap.get('id');
    return this.projects.find(p => p.slug === slug || p.id.toString() === slug) || this.projects[0];
  });

  ngOnInit() {
    this.scrollListener = () => {
      this.scrollY.set(window.scrollY);
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  bannerParallax = computed(() => {
    return `translateY(${this.scrollY() * 0.3}px) scale(${1 + this.scrollY() * 0.0003})`;
  });
}
