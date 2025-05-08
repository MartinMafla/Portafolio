// project-gallery.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="gallery-container">
      <h2 class="gallery-title">Galería del Proyecto</h2>
      
      <div class="gallery-content">
        <div class="gallery-main">
          <img [src]="selectedImage" [alt]="'Gallery image '" class="main-image">
        </div>
        
        <div class="gallery-thumbnails">
          <div 
            *ngFor="let image of images; let i = index" 
            class="thumbnail" 
            [class.active]="image === selectedImage"
            (click)="selectImage(image)">
            <img [src]="image" [alt]="'Thumbnail ' + i">
          </div>
        </div>
      </div>
      
      <div class="image-navigation">
        <button class="nav-button prev" (click)="prevImage()" [disabled]="currentIndex === 0">
          <lucide-angular name="chevron-left"></lucide-angular>
        </button>
        <span class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
        <button class="nav-button next" (click)="nextImage()" [disabled]="currentIndex === images.length - 1">
          <lucide-angular name="chevron-right"></lucide-angular>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .gallery-container {
      margin-top: 3rem;
    }
    
    .gallery-title {
      color: #2d3436;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #6c5ce7;
      padding-bottom: 0.5rem;
      display: inline-block;
    }
    
    .gallery-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .gallery-main {
      width: 100%;
      height: 450px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .main-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .main-image:hover {
      transform: scale(1.02);
    }
    
    .gallery-thumbnails {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding: 0.5rem 0;
    }
    
    .thumbnail {
      width: 100px;
      height: 75px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .thumbnail:hover {
      opacity: 0.9;
    }
    
    .thumbnail.active {
      opacity: 1;
      border-color: #6c5ce7;
    }
    
    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .image-navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
      gap: 1rem;
    }
    
    .nav-button {
      background: white;
      border: 1px solid #ddd;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .nav-button:hover:not(:disabled) {
      background: #6c5ce7;
      color: white;
      border-color: #6c5ce7;
    }
    
    .nav-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .image-counter {
      font-size: 0.9rem;
      color: #666;
    }
    
    @media (max-width: 768px) {
      .gallery-main {
        height: 300px;
      }
      
      .thumbnail {
        width: 80px;
        height: 60px;
      }
    }
  `]
})
export class ProjectGalleryComponent {
  @Input() images: string[] = [];
  
  selectedImage: string = '';
  currentIndex: number = 0;
  
  ngOnInit() {
    if (this.images.length > 0) {
      this.selectedImage = this.images[0];
    }
  }
  
  selectImage(image: string) {
    this.selectedImage = image;
    this.currentIndex = this.images.indexOf(image);
  }
  
  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.selectedImage = this.images[this.currentIndex];
    }
  }
  
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedImage = this.images[this.currentIndex];
    }
  }
}