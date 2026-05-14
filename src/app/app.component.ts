import {
  Component,
  HostListener,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { MagneticDirective } from './components/magnetic/magnetic.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CustomCursorComponent,
    MagneticDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly platform = inject(PLATFORM_ID);

  readonly isScrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly currentRoute = signal('/');

  // Live local time (for the navbar status badge)
  readonly currentTime = signal(this.formatTime());

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.currentRoute.set(e.urlAfterRedirects);
        this.menuOpen.set(false);
      });

    if (isPlatformBrowser(this.platform)) {
      setInterval(() => this.currentTime.set(this.formatTime()), 1000);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 30);
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  private formatTime() {
    return new Date().toLocaleTimeString('es-EC', {
      timeZone: 'America/Guayaquil',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
}
