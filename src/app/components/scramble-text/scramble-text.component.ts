import {
  Component,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scrambling text effect — popularised by award-winning portfolios.
 * Cycles random characters, then resolves to the final text.
 */
@Component({
  selector: 'app-scramble-text',
  standalone: true,
  template: `<span [attr.aria-label]="text()">{{ display() }}</span>`,
  styles: [
    `:host { display: inline-block; font-feature-settings: "tnum"; }`,
  ],
})
export class ScrambleTextComponent {
  private readonly platform = inject(PLATFORM_ID);

  readonly text = input.required<string>();
  readonly delay = input<number>(0);
  readonly speed = input<number>(40);

  readonly display = signal('');
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%abcdefghijklmnopqrstuvwxyz';

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platform)) {
        this.display.set(this.text());
        return;
      }
      setTimeout(() => this.scramble(), this.delay());
    });
  }

  private scramble() {
    const target = this.text();
    let i = 0;
    const tick = () => {
      if (i >= target.length) {
        this.display.set(target);
        return;
      }
      // build the displayed string: locked prefix + random chars
      const locked = target.slice(0, i);
      const remaining = Array.from({ length: target.length - i })
        .map(() => this.chars[Math.floor(Math.random() * this.chars.length)])
        .join('');
      this.display.set(locked + remaining);
      // resolve next char every 3 random ticks
      if (Math.random() > 0.6) i++;
      setTimeout(tick, this.speed());
    };
    tick();
  }
}
