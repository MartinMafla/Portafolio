import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Martin Mafla — Inicio',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'Sobre Mí — Martin Mafla',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
    title: 'Proyectos — Martin Mafla',
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./components/project-details/project-details.component').then(
        (m) => m.ProjectDetailsComponent,
      ),
    title: 'Proyecto — Martin Mafla',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
    title: 'Contacto — Martin Mafla',
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./pages/education/education.component').then(
        (m) => m.EducationComponent,
      ),
    title: 'Educación — Martin Mafla',
  },
  { path: '**', redirectTo: '' },
];
