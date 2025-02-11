import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="contact-form" (ngSubmit)="onSubmit()" [formGroup]="contactForm">
      <h2>Contáctame</h2>
      
      <div class="form-group">
        <label for="name">Nombre</label>
        <input id="name" type="text" formControlName="name">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">
      </div>

      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" formControlName="message" rows="5"></textarea>
      </div>

      <button type="submit" [disabled]="!contactForm.valid">Enviar</button>
    </form>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Implementa aquí la lógica de envío
    }
  }
}
