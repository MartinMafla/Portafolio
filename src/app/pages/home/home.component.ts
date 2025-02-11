import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Code, Brain, Rocket, Coffee } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  codeIcon = Code;
  brainIcon = Brain;
  rocketIcon = Rocket;
  coffeeIcon = Coffee;

  skills = [
    { name: 'HTML/CSS', level: 100 },
    { name: 'JavaScript', level: 95 },
    { name: 'Angular', level: 98 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 87 },
  ];
}