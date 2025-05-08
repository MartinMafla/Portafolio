import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

interface TechLogo {
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-tech-sphere',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tech-sphere-container" #rendererContainer>
      <div class="tech-logos-container">
        <div class="tech-logo" 
             *ngFor="let tech of technologies; let i = index" 
             [style.transform]="getLogoTransform(i)"
             [style.transition]="'all ' + getRandomDelay() + 's ease'">
          <i [class]="tech.icon" [style.color]="tech.color" [title]="tech.name"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tech-sphere-container {
      width: 100%;
      height: 500px;
      position: relative;
      overflow: visible;
      perspective: 1000px;
    }
    
    .tech-logos-container {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: rotate 30s infinite linear;
      position: relative;
    }
    
    .tech-logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      background-color: white;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      transition: all 0.3s ease;
      position: absolute;
      top: calc(50% - 40px);
      left: calc(50% - 40px);
      z-index: 1;
    }
    
    .tech-logo:hover {
      transform: scale(1.2) translateZ(50px) !important;
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
      z-index: 10;
    }
    
    .tech-logo i {
      font-size: 42px;
    }
    
    @keyframes rotate {
      0% {
        transform: rotateY(0) rotateX(15deg);
      }
      100% {
        transform: rotateY(360deg) rotateX(15deg);
      }
    }
  `]
})
export class TechSphereComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  
  private mouseX = 0;
  private mouseY = 0;
  private isMouseOver = false;
  
  // Lista de tecnologías con sus iconos y colores
  technologies: TechLogo[] = [
    { name: 'Angular', icon: 'devicon-angular-plain', color: '#DD0031' },
    { name: 'React', icon: 'devicon-react-original', color: '#61DAFB' },
    { name: 'Vue', icon: 'devicon-vuejs-plain', color: '#4FC08D' },
    { name: 'Next.js', icon: 'devicon-nextjs-original', color: '#000000' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain', color: '#339933' },
    { name: 'Python', icon: 'devicon-python-plain', color: '#3776AB' },
    { name: 'Astro', icon: 'devicon-astro-plain', color: '#FF5D01' },
    { name: 'Svelte', icon: 'devicon-svelte-plain', color: '#FF3E00' },
    { name: 'Vite', icon: 'devicon-vitejs-plain', color: '#646CFF' },
    { name: 'Ionic', icon: 'devicon-ionic-original', color: '#3880FF' },
    { name: 'React Native', icon: 'devicon-react-original', color: '#61DAFB' },
    { name: 'Express', icon: 'devicon-express-original', color: '#000000' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178C6' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain', color: '#F7DF1E' },
    { name: 'SCSS', icon: 'devicon-sass-original', color: '#CC6699' },
    { name: 'HTML5', icon: 'devicon-html5-plain', color: '#E34F26' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain', color: '#47A248' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', color: '#4169E1' },
    { name: 'C#', icon: 'devicon-csharp-plain', color: '#239120' },
    { name: 'SQL', icon: 'devicon-mysql-plain', color: '#4479A1' },
    { name: 'MySQL', icon: 'devicon-mysql-plain', color: '#4479A1' }
  ];

  constructor() { }

  ngAfterViewInit(): void {
    this.initEvents();
  }

  ngOnDestroy(): void {
    this.removeEvents();
  }

  private initEvents(): void {
    const container = this.rendererContainer.nativeElement;
    container.addEventListener('mousemove', this.onMouseMove.bind(this));
    container.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    container.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  private removeEvents(): void {
    const container = this.rendererContainer.nativeElement;
    container.removeEventListener('mousemove', this.onMouseMove.bind(this));
    container.removeEventListener('mouseenter', this.onMouseEnter.bind(this));
    container.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isMouseOver) return;
    
    const container = this.rendererContainer.nativeElement;
    const rect = container.getBoundingClientRect();
    
    // Normalizar coordenadas del mouse (-1 a 1)
    this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    
    // Actualizar estilos de rotación
    const logosContainer = container.querySelector('.tech-logos-container') as HTMLElement;
    if (logosContainer) {
      logosContainer.style.animation = 'none';
      logosContainer.style.transform = `rotateY(${this.mouseX * 30}deg) rotateX(${this.mouseY * -20}deg)`;
    }
  }

  private onMouseEnter(): void {
    this.isMouseOver = true;
  }

  private onMouseLeave(): void {
    this.isMouseOver = false;
    
    // Restaurar la animación
    const container = this.rendererContainer.nativeElement;
    const logosContainer = container.querySelector('.tech-logos-container') as HTMLElement;
    if (logosContainer) {
      logosContainer.style.animation = 'rotate 30s infinite linear';
      logosContainer.style.transform = '';
    }
  }

  // Método para calcular la transformación de cada logo en la esfera
  getLogoTransform(index: number): string {
    const count = this.technologies.length;
    
    // Distribución en una esfera usando el algoritmo de Fibonacci
    const phi = Math.PI * (3 - Math.sqrt(5)); // Ángulo dorado
    const y = 1 - (index / (count - 1)) * 2; // y va de 1 a -1
    const radiusAtY = Math.sqrt(1 - y * y); // radio en la coordenada y
    
    const theta = phi * index; // ángulo dorado incrementado
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    const radius = 240; // Radio de la esfera en píxeles
    
    // Calcular la transformación CSS para colocar el logo en su posición 3D
    return `translateX(${x * radius}px) translateY(${y * radius}px) translateZ(${z * radius}px)`;
  }

  // Método para obtener un retraso aleatorio para las animaciones
  getRandomDelay(): number {
    return 0.2 + Math.random() * 0.8; // Entre 0.2 y 1 segundo
  }
}