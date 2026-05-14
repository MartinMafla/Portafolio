import {
  Directive,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Magnetic effect — applies translate to the host element following
 * the cursor on hover. Strength input controls magnitude.
 *
 * Usage: <button magnetic [strength]="0.4">Click</button>
 */
@Directive({
  selector: '[magnetic]',
  standalone: true,
})
export class MagneticDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platform = inject(PLATFORM_ID);

  readonly strength = input<number>(0.35);

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platform)) return;
    if (matchMedia('(hover: none)').matches) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * this.strength();
    const dy = (e.clientY - cy) * this.strength();

    this.el.nativeElement.style.transform = `translate(${dx}px, ${dy}px)`;
    this.el.nativeElement.style.transition = 'transform 0.15s ease-out';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.style.transform = '';
    this.el.nativeElement.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }
}
