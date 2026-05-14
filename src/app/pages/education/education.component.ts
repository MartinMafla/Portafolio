import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MagneticDirective } from '../../components/magnetic/magnetic.directive';

interface EducationItem {
  year: string;
  yearTo?: string;
  title: string;
  institution: string;
  type: 'degree' | 'cert' | 'course' | 'workshop' | 'work';
  description: string;
  skills: string[];
  status: 'completed' | 'ongoing';
  highlight?: boolean;
}

interface Achievement {
  number: string;
  label: string;
  detail: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RouterLink, MagneticDirective],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  achievements: Achievement[] = [
    { number: '5+', label: 'años', detail: 'experiencia profesional' },
    { number: '4', label: 'empresas', detail: 'donde he aportado' },
    { number: '3', label: 'idiomas', detail: 'ES nativo · EN fluido · FR intermedio' },
    { number: 'USFQ', label: 'pregrado', detail: 'Diseño en Medios Interactivos' },
  ];

  education: EducationItem[] = [
    // ─── Carrera profesional (work experience del CV) ──────────────────
    {
      year: 'Abr 2025',
      yearTo: 'actualidad',
      title: 'Software Engineer',
      institution: 'Banistmo · Grupo Financiero Promerica',
      type: 'work',
      description:
        'Desarrollo y mantenimiento de sistemas bancarios críticos con Java Spring Boot y arquitectura de microservicios. APIs RESTful para core bancario, módulos de transacciones seguras con detección de fraude, dashboards Angular para administración. Cumplimiento PCI-DSS y protocolos de seguridad financiera.',
      skills: ['Java', 'Spring Boot', 'Microservicios', 'Angular', 'PCI-DSS', 'Scrum'],
      status: 'ongoing',
      highlight: true,
    },
    {
      year: 'Ene 2022',
      yearTo: 'Mar 2025',
      title: 'Senior WordPress Developer & Tech Lead',
      institution: 'HEX',
      type: 'work',
      description:
        'Desarrollo avanzado de sitios WordPress con custom themes y plugins en PHP, JS y MySQL. Implementación de WooCommerce con payment gateways personalizados, sistemas de inventario, optimización SEO y performance con caching y CDN.',
      skills: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'SEO', 'Tech Leadership'],
      status: 'completed',
      highlight: true,
    },
    {
      year: 'Jul 2023',
      yearTo: 'Dic 2023',
      title: 'Data Engineer & Full Stack Developer',
      institution: 'Freelance',
      type: 'work',
      description:
        'APIs escalables con Node.js, Python y TypeScript para procesamiento de big data. Containerización con Docker desplegada en AWS. Dashboards interactivos en Power BI y aplicaciones móviles cross-platform con Flutter.',
      skills: ['Node.js', 'Python', 'AWS', 'Docker', 'Power BI', 'Flutter'],
      status: 'completed',
    },
    {
      year: 'Ene 2023',
      yearTo: 'Jun 2023',
      title: 'Arquitecto de Software & Desarrollador Java',
      institution: 'Freelance',
      type: 'work',
      description:
        'Migración de arquitectura monolítica a microservicios en sistemas empresariales con Java Spring Boot y C#. Interfaces web con JSP, Primefaces y Angular aplicando principios UX para plataformas críticas.',
      skills: ['Java', 'Spring Boot', 'C#', 'JSP', 'Primefaces', 'Microservicios'],
      status: 'completed',
    },
    {
      year: 'Jun 2022',
      yearTo: 'Dic 2022',
      title: 'Desarrollador de Sistemas & Analista BI',
      institution: 'Diners Club',
      type: 'work',
      description:
        'Módulos transaccionales en Java con JSP y Primefaces. Automatización ETL con Power Query y Python para procesamiento de datos financieros. Dashboards ejecutivos en Power BI con KPIs en tiempo real.',
      skills: ['Java', 'Power BI', 'Python', 'ETL', 'Power Query'],
      status: 'completed',
    },

    // ─── Educación formal ──────────────────────────────────────────────
    {
      year: '2021',
      yearTo: '2025',
      title: 'Diseño en Medios Interactivos',
      institution: 'Universidad San Francisco de Quito',
      type: 'degree',
      description:
        'Carrera de pregrado en la USFQ con enfoque en intersección entre diseño, código y experiencia digital. Combinación de fundamentos de programación con principios sólidos de diseño visual, motion graphics y narrativa digital.',
      skills: ['Diseño UX/UI', 'Motion', 'Branding', 'Programación', 'Narrativa Digital'],
      status: 'completed',
      highlight: true,
    },
  ];

  certifications = [
    'Diseño en Medios Interactivos · USFQ',
    'Java Avanzado',
    'Scrum: Avanzado',
    'XP: Avanzado',
    'DevOps · CI/CD',
    'Inglés Fluido',
    'Francés Intermedio',
  ];

  philosophy = [
    {
      title: 'Diseño + código',
      text: 'Mi formación en Diseño Gráfico me dio el ojo. La práctica diaria me dio el código. Lo más interesante pasa cuando ambos se cruzan.',
    },
    {
      title: 'Sistemas críticos, calma absoluta',
      text: 'Trabajar en banca te enseña que un bug no es solo un bug — es plata real, gente real, confianza real. Esa mentalidad la traslado a todo lo que hago.',
    },
    {
      title: 'Aprender haciendo',
      text: 'Los certificados ayudan, pero la realidad enseña distinto. Cada empresa, cada cliente, cada proyecto fallido — ahí está el aprendizaje real.',
    },
  ];
}
