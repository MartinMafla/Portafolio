import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a [routerLink]="['/projects', slug()]" class="pcard" [style.--pcard-accent]="accent()">
      <div class="pcard__cover">
        <img [src]="cover()" [alt]="title()" loading="lazy" />
      </div>
      <div class="pcard__body">
        <span class="mono pcard__year">{{ year() }}</span>
        <h3 class="pcard__title">{{ title() }}</h3>
        <p class="pcard__tag">{{ tagline() }}</p>
      </div>
    </a>
  `,
  styles: [`
    .pcard {
      display: block;
      background: var(--surface-1);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-lg);
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

      &:hover {
        transform: translateY(-4px);
        border-color: var(--pcard-accent, var(--brand));

        .pcard__cover img {
          transform: scale(1.05);
        }

        .pcard__title {
          color: var(--pcard-accent, var(--brand-bright));
        }
      }

      &__cover {
        aspect-ratio: 16 / 10;
        overflow: hidden;
        background: var(--surface-2);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      }

      &__body {
        padding: 20px 24px 24px;
      }

      &__year {
        font-size: 11px;
        color: var(--ink-low);
        letter-spacing: 0.08em;
        margin-bottom: 8px;
        display: block;
      }

      &__title {
        font-family: var(--font-display);
        font-size: 32px;
        font-weight: 400;
        line-height: 1;
        letter-spacing: -0.02em;
        color: var(--ink-high);
        margin: 0 0 8px;
        transition: color 0.3s ease;
      }

      &__tag {
        font-size: 14px;
        color: var(--ink-mid);
        margin: 0;
        line-height: 1.5;
      }
    }
  `]
})
export class ProjectCardComponent {
  slug = input.required<string>();
  title = input.required<string>();
  tagline = input.required<string>();
  cover = input.required<string>();
  year = input.required<string>();
  accent = input<string>('#6c5ce7');
}
