// Updated about.component.ts file
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

interface TechCategory {
  name: string;
  technologies: Technology[];
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

  techCategories: TechCategory[] = [
    {
      name: 'Frontend',
      technologies: [
        { name: 'Angular', icon: 'devicon-angular-plain colored', level: 90 },
        { name: 'React', icon: 'devicon-react-original colored', level: 85 },
        { name: 'Vue', icon: 'devicon-vuejs-plain colored', level: 80 },
        { name: 'Svelte', icon: 'devicon-svelte-plain colored', level: 75 },
        { name: 'Astro', icon: 'devicon-astro-plain colored', level: 70 },
        { name: 'Tailwind', icon: 'devicon-tailwindcss-plain colored', level: 85 },
        { name: 'Next.js', icon: 'devicon-nextjs-original colored', level: 80 },
        { name: 'React Native', icon: 'devicon-react-original colored', level: 75 },
        { name: 'Ionic', icon: 'devicon-ionic-original colored', level: 80 }
      ]
    },
    {
      name: 'Backend',
      technologies: [
        { name: 'Python', icon: 'devicon-python-plain colored', level: 75 },
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored', level: 85 },
        { name: 'Deno', icon: 'devicon-denojs-original colored', level: 70 },
        { name: 'TypeScript', icon: 'devicon-typescript-plain colored', level: 90 },
        { name: 'C#', icon: 'devicon-csharp-plain colored', level: 65 }
      ]
    },
    {
      name: 'Bases de Datos',
      technologies: [
        { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', level: 80 },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', level: 75 },
        { name: 'SQL', icon: 'devicon-microsoftsqlserver-plain colored', level: 80 },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored', level: 85 },
        { name: 'Supabase', icon: 'devicon-supabase-plain colored', level: 70 },
        { name: 'Firebase', icon: 'devicon-firebase-plain colored', level: 80 }
      ]
    },
    {
      name: 'UI/UX',
      technologies: [
        { name: 'Adobe Illustrator', icon: 'devicon-illustrator-plain colored', level: 85 },
        { name: 'Adobe Photoshop', icon: 'devicon-photoshop-plain colored', level: 80 },
        { name: 'Figma', icon: 'devicon-figma-plain colored', level: 90 },
        { name: 'Framer', icon: 'devicon-framerjs-original colored', level: 75 }
      ]
    }
  ];
}