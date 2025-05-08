import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="logo">
        <a routerLink="/">
          <img src="assets/images/logo-v1.png" alt="Logo">
        </a>
      </div>
      <ul>
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a></li>
        <li><a routerLink="/about" routerLinkActive="active">Sobre Mí</a></li>
        <li><a routerLink="/projects" routerLinkActive="active">Proyectos</a></li>
        <li><a routerLink="/education" routerLinkActive="active">Educación</a></li>
        <li><a routerLink="/contact" routerLinkActive="active">Contacto</a></li>
      </ul>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'mi-portafolio';
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}