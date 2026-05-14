import { Component } from '@angular/core';

interface Tech { name: string; icon: string; }

/**
 * Infinite scrolling marquee of technologies — replaces the old 3D sphere.
 * Three rows with alternating direction:
 *   row 1 → (right)
 *   row 2 ← (left)
 *   row 3 → (right)
 * Pure CSS animation, no JS overhead.
 */
@Component({
  selector: 'app-tech-marquee',
  standalone: true,
  template: `
    <div class="marquee-wrap">
      <div class="row row--right">
        <div class="track">
          @for (t of [...row1, ...row1]; track $index) {
            <div class="chip">
              <i [class]="t.icon"></i>
              <span class="mono">{{ t.name }}</span>
            </div>
          }
        </div>
      </div>

      <div class="row row--left">
        <div class="track">
          @for (t of [...row2, ...row2]; track $index) {
            <div class="chip">
              <i [class]="t.icon"></i>
              <span class="mono">{{ t.name }}</span>
            </div>
          }
        </div>
      </div>

      <div class="row row--right">
        <div class="track track--slow">
          @for (t of [...row3, ...row3]; track $index) {
            <div class="chip">
              <i [class]="t.icon"></i>
              <span class="mono">{{ t.name }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .marquee-wrap {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
      }

      .row { overflow: hidden; }

      .track {
        display: flex;
        gap: 1rem;
        flex-shrink: 0;
        width: max-content;
        animation: scroll 40s linear infinite;
      }

      .track--slow { animation-duration: 60s; }

      /* row 1 and row 3: visually move right (chips drift rightward) */
      .row--right .track {
        animation-direction: reverse;
      }

      /* row 2: default (left direction) */
      .row--left .track {
        animation-direction: normal;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.7rem 1.2rem;
        border: 1px solid var(--border-soft);
        border-radius: var(--radius-pill);
        background: var(--surface-glass);
        backdrop-filter: blur(20px);
        white-space: nowrap;
        transition: border-color 0.3s var(--ease-snap), transform 0.3s var(--ease-snap);
      }

      .chip:hover {
        border-color: var(--brand);
        transform: translateY(-2px);
      }

      .chip i {
        font-size: 1.2rem;
        color: var(--ink-2);
      }

      .chip .mono {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--ink-2);
      }

      @keyframes scroll {
        to { transform: translateX(-50%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .track { animation: none; }
      }
    `,
  ],
})
export class TechMarqueeComponent {
  row1: Tech[] = [
    { name: 'Angular', icon: 'devicon-angular-plain colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Next.js', icon: 'devicon-nextjs-original' },
    { name: 'Vue', icon: 'devicon-vuejs-plain colored' },
    { name: 'Svelte', icon: 'devicon-svelte-plain colored' },
    { name: 'Astro', icon: 'devicon-astro-plain colored' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'Three.js', icon: 'devicon-threejs-original' },
  ];

  row2: Tech[] = [
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
    { name: 'Java', icon: 'devicon-java-plain colored' },
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'Express', icon: 'devicon-express-original' },
    { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
  ];

  row3: Tech[] = [
    { name: 'Figma', icon: 'devicon-figma-plain colored' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-plain colored' },
    { name: 'SCSS', icon: 'devicon-sass-original colored' },
    { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
    { name: 'Ionic', icon: 'devicon-ionic-original colored' },
    { name: 'React Native', icon: 'devicon-react-original colored' },
    { name: 'WordPress', icon: 'devicon-wordpress-plain colored' },
    { name: 'C#', icon: 'devicon-csharp-plain colored' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
  ];
}
