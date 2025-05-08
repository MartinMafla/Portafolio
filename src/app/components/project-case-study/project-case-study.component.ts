// project-case-study.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface CaseStudy {
  problem: string;
  solution: string;
  process: string[];
  results: string[];
  improvements: string[];
}

@Component({
  selector: 'app-project-case-study',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="case-study-container">
      <div class="case-study-section">
        <h2>
          <lucide-angular name="lightbulb" class="section-icon"></lucide-angular>
          Introducción al Problema
        </h2>
        <div class="section-content">
          <p>{{ caseStudy.problem }}</p>
        </div>
      </div>
      
      <div class="case-study-section">
        <h2>
          <lucide-angular name="zap" class="section-icon"></lucide-angular>
          Descripción de la Solución
        </h2>
        <div class="section-content">
          <p>{{ caseStudy.solution }}</p>
          
          <h3>Proceso de Desarrollo</h3>
          <ul class="process-list">
            <li *ngFor="let step of caseStudy.process">
              <lucide-angular name="check-square" class="list-icon"></lucide-angular>
              <span>{{ step }}</span>
            </li>
          </ul>
          
          <h3>Resultados Obtenidos</h3>
          <ul class="results-list">
            <li *ngFor="let result of caseStudy.results">
              <lucide-angular name="trophy" class="list-icon"></lucide-angular>
              <span>{{ result }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="case-study-section">
        <h2>
          <lucide-angular name="trending-up" class="section-icon"></lucide-angular>
          Mejoras Propuestas
        </h2>
        <div class="section-content">
          <ul class="improvements-list">
            <li *ngFor="let improvement of caseStudy.improvements">
              <lucide-angular name="arrow-up-right" class="list-icon"></lucide-angular>
              <span>{{ improvement }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .case-study-container {
      margin-top: 2rem;
    }
    
    .case-study-section {
      margin-bottom: 2.5rem;
      
      h2 {
        color: #2d3436;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      h3 {
        color: #6c5ce7;
        font-size: 1.25rem;
        margin: 1.5rem 0 1rem 0;
      }
      
      .section-icon {
        color: #6c5ce7;
      }
      
      .section-content {
        padding-left: 1.75rem;
        border-left: 3px solid #6c5ce7;
      }
      
      p {
        color: #4d4d4d;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
    }
    
    .process-list, .results-list, .improvements-list {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem 0;
        color: #4d4d4d;
        line-height: 1.6;
        
        &:not(:last-child) {
          border-bottom: 1px solid #eee;
        }
      }
      
      .list-icon {
        color: #6c5ce7;
        flex-shrink: 0;
        margin-top: 0.2rem;
      }
    }
    
    @media (max-width: 768px) {
      .case-study-section .section-content {
        padding-left: 1rem;
      }
    }
  `]
})
export class ProjectCaseStudyComponent {
  @Input() caseStudy: CaseStudy = {
    problem: '',
    solution: '',
    process: [],
    results: [],
    improvements: []
  };
}