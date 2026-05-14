import { Component, input } from '@angular/core';

/**
 * Abstract avatar — replaces real photos.
 * A geometric "M" glyph wrapped in concentric rings,
 * built entirely in SVG. Reactive to a [size] input.
 */
@Component({
  selector: 'app-avatar-glyph',
  standalone: true,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="avatar"
      [class.avatar--animated]="animated()"
    >
      <!-- soft brand glow -->
      <defs>
        <radialGradient id="ag-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#6c5ce7" stop-opacity="0.45" />
          <stop offset="60%" stop-color="#6c5ce7" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#6c5ce7" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="ag-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8a7ef5" />
          <stop offset="100%" stop-color="#6c5ce7" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill="url(#ag-glow)" />

      <!-- concentric tactile rings -->
      <circle cx="100" cy="100" r="90" stroke="url(#ag-stroke)" stroke-width="1" stroke-dasharray="2 4" opacity="0.5" />
      <circle cx="100" cy="100" r="72" stroke="rgba(255,255,255,0.18)" stroke-width="1" />

      <!-- inner monogram "M" — geometric, brutalist -->
      <g transform="translate(100 100)">
        <path
          d="M -32 32 L -32 -32 L -8 -32 L 0 -8 L 8 -32 L 32 -32 L 32 32 L 18 32 L 18 -8 L 4 24 L -4 24 L -18 -8 L -18 32 Z"
          fill="url(#ag-stroke)"
          stroke="rgba(255,255,255,0.4)"
          stroke-width="0.5"
        />
        <!-- corner accent dots -->
        <circle cx="-50" cy="-50" r="2" fill="#67e8f9" />
        <circle cx="50" cy="-50" r="2" fill="#c084fc" />
        <circle cx="-50" cy="50" r="2" fill="#c084fc" />
        <circle cx="50" cy="50" r="2" fill="#67e8f9" />
      </g>

      <!-- mono label -->
      @if (showLabel()) {
        <text
          x="100"
          y="186"
          text-anchor="middle"
          font-family="JetBrains Mono, monospace"
          font-size="8"
          letter-spacing="2"
          fill="rgba(245,245,247,0.55)"
        >BY.MARTIN — V2.0</text>
      }
    </svg>
  `,
  styles: [
    `
      :host { display: inline-block; line-height: 0; }
      .avatar { display: block; }
      .avatar--animated g {
        transform-origin: center;
        animation: spin 60s linear infinite reverse;
      }
      .avatar--animated circle:first-of-type ~ circle:nth-of-type(2) {
        animation: spin 80s linear infinite;
        transform-origin: 100px 100px;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `,
  ],
})
export class AvatarGlyphComponent {
  readonly size = input<number>(160);
  readonly animated = input<boolean>(true);
  readonly showLabel = input<boolean>(false);
}
