import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarGlyphComponent } from '../../components/avatar-glyph/avatar-glyph.component';
import { MagneticDirective } from '../../components/magnetic/magnetic.directive';

interface Fact {
  k: string;
  v: string;
}
interface Service {
  no: string;
  title: string;
  desc: string;
  bullets: string[];
}
interface SkillItem {
  name: string;
  icon?: string;
}
interface SkillBlock {
  category: string;
  size: 'sm' | 'md' | 'lg';
  items: SkillItem[];
}
interface JourneyItem {
  year: string;
  title: string;
  side: 'l' | 'r';
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarGlyphComponent, MagneticDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  // ─── Snapshot facts (CV-accurate) ─────────────────────────────────────
  facts: Fact[] = [
    { k: 'Base', v: 'Quito, Ecuador' },
    { k: 'Rol actual', v: 'Software Engineer @ Banistmo' },
    { k: 'Idiomas', v: 'ES · EN · FR' },
    { k: 'Educación', v: 'Diseño en Medios Interactivos · USFQ' },
    { k: 'Especialidad', v: 'Full Stack + UI/UX' },
    { k: 'Disponibilidad', v: 'Freelance & consultoría' },
  ];

  // ─── Services ─────────────────────────────────────────────────────────
  services: Service[] = [
    {
      no: '01',
      title: 'Aplicaciones Full Stack',
      desc: 'Diseño y construcción de aplicaciones completas — desde la arquitectura hasta el último píxel — con foco en mantenibilidad y rendimiento.',
      bullets: [
        'Angular · React · Next · Svelte',
        'Spring Boot · Node · Express',
        'AWS · Docker · CI/CD',
      ],
    },
    {
      no: '02',
      title: 'Dashboards & BI',
      desc: 'Paneles internos para datos críticos: KPIs en tiempo real, ETL, integraciones con APIs y visualizaciones que cuentan historias.',
      bullets: [
        'Angular + PrimeNG',
        'Power BI · Power Query',
        'PostgreSQL · MongoDB · DynamoDB',
      ],
    },
    {
      no: '03',
      title: 'Apps Móviles Híbridas',
      desc: 'Apps cross-platform que se sienten nativas. Una codebase, iOS + Android + web — con autenticación, push notifications y offline-first.',
      bullets: [
        'Flutter · Ionic · React Native',
        'Firebase · Supabase',
        'Stripe · pasarelas de pago',
      ],
    },
    {
      no: '04',
      title: 'UI/UX & Branding',
      desc: 'De la idea al sistema de diseño. Identidad visual, prototipos, design tokens y handoff a desarrollo sin fricción.',
      bullets: [
        'Figma · Adobe Suite',
        'WordPress · Webflow · Framer',
        'Design systems & tokens',
      ],
    },
  ];

  // ─── Skills bento — full CV stack ─────────────────────────────────────
  skillBlocks: SkillBlock[] = [
    {
      category: 'Frontend & Mobile',
      size: 'lg',
      items: [
        { name: 'Angular', icon: 'devicon-angular-plain colored' },
        { name: 'React', icon: 'devicon-react-original colored' },
        { name: 'Next.js', icon: 'devicon-nextjs-original colored' },
        { name: 'Svelte', icon: 'devicon-svelte-plain colored' },
        { name: 'Astro', icon: 'devicon-astro-plain colored' },
        { name: 'Vue', icon: 'devicon-vuejs-plain colored' },
        { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
        { name: 'Dart', icon: 'devicon-dart-plain colored' },
        { name: 'Ionic', icon: 'devicon-ionic-original colored' },
        { name: 'React Native', icon: 'devicon-react-original colored' },
        { name: 'Tailwind', icon: 'devicon-tailwindcss-plain colored' },
        { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored' },
        { name: 'HTML5', icon: 'devicon-html5-plain colored' },
        { name: 'CSS3', icon: 'devicon-css3-plain colored' },
        { name: 'JSP', icon: 'devicon-java-plain colored' },
        { name: 'Primefaces' },
      ],
    },
    {
      category: 'Backend',
      size: 'md',
      items: [
        { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
        { name: 'Java', icon: 'devicon-java-plain colored' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
        { name: 'Express', icon: 'devicon-express-original colored' },
        { name: 'Deno', icon: 'devicon-denojs-original colored' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
        { name: 'Python', icon: 'devicon-python-plain colored' },
        { name: 'Laravel', icon: 'devicon-laravel-plain colored' },
        { name: 'PHP', icon: 'devicon-php-plain colored' },
        { name: 'C#', icon: 'devicon-csharp-plain colored' },
        { name: 'Apache', icon: 'devicon-apache-plain colored' },
      ],
    },
    {
      category: 'Bases de Datos',
      size: 'md',
      items: [
        { name: 'SQL Server', icon: 'devicon-microsoftsqlserver-plain colored' },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
        { name: 'Oracle DB', icon: 'devicon-oracle-original colored' },
        { name: 'DynamoDB', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
        { name: 'Supabase', icon: 'devicon-supabase-plain colored' },
        { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
      ],
    },
    {
      category: 'Cloud & DevOps',
      size: 'md',
      items: [
        { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
        { name: 'Lambda', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
        { name: 'API Gateway', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
        { name: 'Docker', icon: 'devicon-docker-plain colored' },
        { name: 'Azure DevOps', icon: 'devicon-azure-plain colored' },
        { name: 'Git', icon: 'devicon-git-plain colored' },
        { name: 'GitHub', icon: 'devicon-github-original colored' },
        { name: 'Maven', icon: 'devicon-apache-plain colored' },
      ],
    },
    {
      category: 'Testing & Analytics',
      size: 'sm',
      items: [
        { name: 'JUnit' },
        { name: 'Postman', icon: 'devicon-postman-plain colored' },
        { name: 'Swagger UI' },
        { name: 'JMeter', icon: 'devicon-apache-plain colored' },
        { name: 'Power BI' },
      ],
    },
    {
      category: 'CMS & No-Code',
      size: 'sm',
      items: [
        { name: 'WordPress', icon: 'devicon-wordpress-plain colored' },
        { name: 'WooCommerce' },
        { name: 'Shopify' },
        { name: 'Webflow' },
        { name: 'Framer', icon: 'devicon-framerjs-original colored' },
      ],
    },
    {
      category: 'Diseño & UI/UX',
      size: 'md',
      items: [
        { name: 'Figma', icon: 'devicon-figma-plain colored' },
        { name: 'Illustrator', icon: 'devicon-illustrator-plain colored' },
        { name: 'Photoshop', icon: 'devicon-photoshop-plain colored' },
        { name: 'Adobe XD', icon: 'devicon-xd-plain colored' },
        { name: 'Three.js', icon: 'devicon-threejs-original colored' },
      ],
    },
    {
      category: 'Metodologías',
      size: 'sm',
      items: [
        { name: 'Scrum' },
        { name: 'XP' },
        { name: 'DevOps · CI/CD' },
        { name: 'Microservicios' },
        { name: 'REST APIs' },
      ],
    },
  ];

  // ─── Career timeline (CV-accurate) ────────────────────────────────────
  journey: JourneyItem[] = [
    { year: '2026 — actualidad', title: 'Software Engineer @ Banistmo (Grupo Financiero Promerica)', side: 'l' },
    { year: '2025 — 2026', title: 'Software Engineer @ Banistmo · Sistemas bancarios críticos', side: 'r' },
    { year: '2022 — 2025', title: 'Senior WordPress Developer & Tech Lead @ HEX', side: 'l' },
    { year: '2023 (Jul–Dic)', title: 'Data Engineer & Full Stack Developer · Freelance', side: 'r' },
    { year: '2023 (Ene–Jun)', title: 'Arquitecto de Software & Desarrollador Java · Freelance', side: 'l' },
    { year: '2022 (Jun–Dic)', title: 'Desarrollador de Sistemas & Analista BI @ Diners Club', side: 'r' },
    { year: '2021 — 2025', title: 'Diseño en Medios Interactivos · Universidad San Francisco de Quito', side: 'l' },
  ];
}
