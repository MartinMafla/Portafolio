import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * INTRO SPLASH — Joby-aviation-style branded preloader.
 *
 * Sequence:
 *   0   ms · black screen with a subtle pulsing dot in the center
 *   400 ms · caret blink
 *   600 ms · typewriter "by.martin" — character by character
 *   1700 ms · brief hold + blinking caret
 *   2000 ms · curtain wipe up + emit `done`
 *
 * Performance notes:
 *   - Only runs ONCE per session (uses sessionStorage flag).
 *   - Pure CSS + tiny RAF loop. No images, no Three.js. <2 kB JS overhead.
 *   - Respects `prefers-reduced-motion` — instantly emits `done` for those users.
 */
@Component({
  selector: 'app-intro-splash',
  standalone: true,
  template: `
    <div #root class="splash" [attr.aria-hidden]="closing ? 'true' : 'false'">
      <div class="splash__inner">
        <span class="splash__dot"></span>
        <span class="splash__text" #typed></span><span class="splash__caret">_</span>
      </div>

      <span class="splash__meta mono">
        <span class="splash__meta-row">PORTFOLIO · 2026</span>
        <span class="splash__meta-row" #pct>00</span>
      </span>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: auto;
      }

      .splash {
        position: absolute;
        inset: 0;
        background: #050507;
        display: grid;
        place-items: center;
        overflow: hidden;
        transition: clip-path 1.05s cubic-bezier(0.76, 0, 0.24, 1);
        clip-path: inset(0 0 0 0);

        /* tiny grain — same vibe as the app */
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
          );
          background-size: 3px 3px;
          opacity: 0.6;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        /* radial glow accent */
        &::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(108, 92, 231, 0.12) 0%,
            transparent 60%
          );
          pointer-events: none;
          animation: pulse 3s ease-in-out infinite;
        }
      }

      .splash--closing {
        clip-path: inset(0 0 100% 0);
      }

      .splash__inner {
        display: flex;
        align-items: center;
        gap: 14px;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: clamp(32px, 6vw, 64px);
        color: #ededf0;
        letter-spacing: -0.03em;
        position: relative;
        z-index: 2;
      }

      .splash__dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #6c5ce7;
        box-shadow: 0 0 14px #6c5ce7, 0 0 28px rgba(108, 92, 231, 0.4);
        animation: pulse-dot 1.2s ease-in-out infinite;
      }

      .splash__text {
        display: inline-block;
        white-space: nowrap;
      }

      .splash__caret {
        color: #6c5ce7;
        animation: blink 0.7s steps(1, end) infinite;
        margin-left: 2px;
        font-weight: 300;
      }

      .splash__meta {
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        color: rgba(237, 237, 240, 0.4);
        text-transform: uppercase;
      }

      .splash__meta-row {
        display: block;
      }

      @keyframes pulse-dot {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.4); opacity: 0.7; }
      }

      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        .splash {
          transition: none;
        }
        .splash__dot,
        .splash__caret,
        .splash::after {
          animation: none !important;
        }
      }
    `,
  ],
})
export class IntroSplashComponent implements AfterViewInit, OnDestroy {
  @Output() done = new EventEmitter<void>();
  @ViewChild('root', { static: true }) rootRef!: ElementRef<HTMLDivElement>;
  @ViewChild('typed', { static: true }) typedRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('pct', { static: true }) pctRef!: ElementRef<HTMLSpanElement>;

  private readonly platform = inject(PLATFORM_ID);
  closing = false;
  private timers: number[] = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) {
      this.done.emit();
      return;
    }

    // Skip intro for users who prefer reduced motion
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) {
      this.finish();
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const word = 'by.martin';
    const charDelay = 90;
    const startDelay = 350;

    // Typewriter
    word.split('').forEach((ch, i) => {
      this.timers.push(
        window.setTimeout(() => {
          if (this.typedRef?.nativeElement) {
            this.typedRef.nativeElement.textContent += ch;
          }
        }, startDelay + i * charDelay),
      );
    });

    // Percent counter (visual progress)
    let pct = 0;
    const tickEvery = 22;
    const tick = () => {
      pct = Math.min(100, pct + Math.ceil(Math.random() * 6));
      if (this.pctRef?.nativeElement) {
        this.pctRef.nativeElement.textContent =
          pct.toString().padStart(2, '0');
      }
      if (pct < 100) {
        this.timers.push(window.setTimeout(tick, tickEvery));
      }
    };
    this.timers.push(window.setTimeout(tick, 100));

    // Hold + close
    const total = startDelay + word.length * charDelay + 700;
    this.timers.push(window.setTimeout(() => this.finish(), total));
  }

  private finish() {
    this.closing = true;
    if (isPlatformBrowser(this.platform)) {
      this.rootRef.nativeElement.classList.add('splash--closing');
      try {
        sessionStorage.setItem('martin_intro_seen', '1');
      } catch {
        /* sessionStorage may be blocked — non-blocking */
      }
      window.setTimeout(() => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        this.done.emit();
      }, 1100);
    } else {
      this.done.emit();
    }
  }

  ngOnDestroy(): void {
    this.timers.forEach((t) => clearTimeout(t));
    if (isPlatformBrowser(this.platform)) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }

  /** Helper used by the app to know whether to show the splash */
  static shouldShow(): boolean {
    if (typeof sessionStorage === 'undefined') return true;
    try {
      return sessionStorage.getItem('martin_intro_seen') !== '1';
    } catch {
      return true;
    }
  }
}
