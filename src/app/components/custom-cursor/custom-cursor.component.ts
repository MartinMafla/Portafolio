import {
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `
    @if (isVisible()) {
      <div
        #ring
        class="cursor-ring"
        [class.cursor-ring--hover]="isHovering()"
        [class.cursor-ring--active]="isActive()"
      ></div>
      <div #dot class="cursor-dot"></div>
    }
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9999;
      }

      .cursor-ring {
        position: fixed;
        top: 0;
        left: 0;
        width: 36px;
        height: 36px;
        border: 1px solid var(--ink-1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition:
          width 0.3s var(--ease-snap),
          height 0.3s var(--ease-snap),
          border-color 0.3s var(--ease-snap),
          background 0.3s var(--ease-snap);
        will-change: transform;
        backdrop-filter: invert(0.05);
      }

      .cursor-ring--hover {
        width: 64px;
        height: 64px;
        border-color: var(--brand);
        background: rgba(108, 92, 231, 0.12);
      }

      .cursor-ring--active {
        width: 24px;
        height: 24px;
        background: var(--brand);
      }

      .cursor-dot {
        position: fixed;
        top: 0;
        left: 0;
        width: 4px;
        height: 4px;
        background: var(--brand);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        will-change: transform;
        box-shadow: 0 0 12px var(--brand-glow);
      }

      @media (hover: none) {
        :host { display: none; }
      }
    `,
  ],
})
export class CustomCursorComponent {
  @ViewChild('ring') ring?: ElementRef<HTMLDivElement>;
  @ViewChild('dot') dot?: ElementRef<HTMLDivElement>;

  private readonly platform = inject(PLATFORM_ID);
  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private rafId = 0;

  readonly isVisible = signal(false);
  readonly isHovering = signal(false);
  readonly isActive = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platform)) return;
      // hide on touch devices
      if (matchMedia('(hover: none)').matches) return;
      this.isVisible.set(true);
      this.tick();
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (this.dot?.nativeElement) {
      this.dot.nativeElement.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }

    // detect interactive targets
    const target = e.target as HTMLElement;
    const interactive =
      target?.closest('a, button, [data-cursor="hover"], input, textarea, select, [role="button"]');
    this.isHovering.set(!!interactive);
  }

  @HostListener('document:mousedown') onDown() { this.isActive.set(true); }
  @HostListener('document:mouseup')   onUp()   { this.isActive.set(false); }

  private tick = () => {
    // soft follow for the ring
    this.ringX += (this.mouseX - this.ringX) * 0.18;
    this.ringY += (this.mouseY - this.ringY) * 0.18;
    if (this.ring?.nativeElement) {
      this.ring.nativeElement.style.transform = `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%)`;
    }
    this.rafId = requestAnimationFrame(this.tick);
  };
}
