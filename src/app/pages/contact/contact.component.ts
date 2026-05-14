import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MagneticDirective } from '../../components/magnetic/magnetic.directive';

interface FormData {
  name: string;
  email: string;
  budget: string;
  type: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MagneticDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  // Form state with signals
  formData = signal<FormData>({
    name: '',
    email: '',
    budget: '',
    type: '',
    message: ''
  });

  submitted = signal(false);
  submitting = signal(false);

  // Validation computed
  emailValid = computed(() => {
    const email = this.formData().email;
    if (!email) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  });

  isValid = computed(() => {
    const f = this.formData();
    return f.name.trim().length >= 2 &&
           this.emailValid() === true &&
           f.message.trim().length >= 10;
  });

  // Project type options
  projectTypes = [
    { id: 'web-app', label: 'Web App' },
    { id: 'landing', label: 'Landing Page' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'mobile', label: 'App Móvil' },
    { id: 'branding', label: 'Branding' },
    { id: 'other', label: 'Otro' }
  ];

  budgetRanges = [
    { id: 'small', label: '< $2k' },
    { id: 'mid', label: '$2k — $5k' },
    { id: 'big', label: '$5k — $15k' },
    { id: 'enterprise', label: '$15k+' },
    { id: 'flex', label: 'Hablamos' }
  ];

  // Time in Quito for live display
  currentTime = signal(new Date());

  // Channels list — real contact info from CV
  channels = [
    {
      label: 'Email',
      value: 'martin_ale_mafla@hotmail.com',
      href: 'mailto:martin_ale_mafla@hotmail.com',
      icon: 'mail',
    },
    {
      label: 'LinkedIn',
      value: '/in/martinmafla',
      href: 'https://www.linkedin.com/in/martinmafla/',
      icon: 'linkedin',
    },
    {
      label: 'Teléfono',
      value: '(+593) 996 136 396',
      href: 'tel:+593996136396',
      icon: 'phone',
    },
  ];

  constructor() {
    setInterval(() => this.currentTime.set(new Date()), 1000);
  }

  updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    this.formData.update(f => ({ ...f, [key]: value }));
  }

  selectType(id: string) {
    this.formData.update(f => ({ ...f, type: id }));
  }

  selectBudget(id: string) {
    this.formData.update(f => ({ ...f, budget: id }));
  }

  async onSubmit() {
    if (!this.isValid() || this.submitting()) return;

    this.submitting.set(true);

    // Simulate submission
    await new Promise(r => setTimeout(r, 1500));

    this.submitting.set(false);
    this.submitted.set(true);
  }

  reset() {
    this.formData.set({
      name: '',
      email: '',
      budget: '',
      type: '',
      message: ''
    });
    this.submitted.set(false);
  }

  get formattedTime(): string {
    return this.currentTime().toLocaleTimeString('es-EC', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Guayaquil'
    });
  }
}
