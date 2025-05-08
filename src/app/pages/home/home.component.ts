import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Code, Brain, Rocket, Coffee } from 'lucide-angular';
import { CharacterAnimationComponent } from '../../components/character-animation/character-animation.component';
import { TechSphereComponent } from '../../components/tech-sphere/tech-sphere.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    LucideAngularModule,
    CharacterAnimationComponent,
    TechSphereComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Iconos de Lucide para características
  codeIcon = Code;
  brainIcon = Brain;
  rocketIcon = Rocket;
  coffeeIcon = Coffee;
  
  // Estadísticas profesionales
  stats = [
    { number: '50+', label: 'Proyectos Completados' },
    { number: '3+', label: 'Años de Experiencia' },
    { number: '30+', label: 'Clientes Satisfechos' },
    { number: '100%', label: 'Compromiso' }
  ];
}