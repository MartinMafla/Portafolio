import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  formSubmitted = false;
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Animación de entrada cuando la página se carga
    this.animateForm();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      this.formSubmitted = true;
      
      // Aquí puedes agregar la lógica para enviar el formulario a un backend
      // Por ejemplo, usando HttpClient para enviar a una API
      
      // Simular un envío exitoso para propósitos de demostración
      setTimeout(() => {
        this.resetForm();
        alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
      }, 1000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      this.markFormGroupTouched(this.contactForm);
    }
  }
  
  // Función para marcar todos los campos como tocados
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  
  // Función para resetear el formulario
  resetForm() {
    this.contactForm.reset();
    this.formSubmitted = false;
    
    // Asignar valores predeterminados para evitar errores de validación
    this.contactForm.patchValue({
      name: '',
      email: '',
      message: ''
    });
  }
  
  // Animación de entrada para el formulario
  private animateForm() {
    // Esta función podría amplirse para añadir animaciones personalizadas
    // Actualmente las animaciones están manejadas por CSS
  }
}