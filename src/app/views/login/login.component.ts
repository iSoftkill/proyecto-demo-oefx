import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);

  usuario = signal('');
  password = signal('');
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  togglePasswordVisibility() {
    this.showPassword.update((visible) => !visible);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage.set(null);

    const user = this.usuario().trim();
    const pass = this.password().trim();

    if (!user || !pass) {
      this.errorMessage.set('Por favor, ingrese su usuario y contraseña.');
      this.focusAlertOrInput();
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      // Simulación de error de autenticación (OWASP/WCAG) si el usuario ingresa "error"
      if (user.toLowerCase() === 'error') {
        this.errorMessage.set('Usuario o contraseña incorrectos. Por favor, verifique sus datos.');
        this.focusAlertOrInput();
        return;
      }

      this.router.navigate(['/login']); //Aqui cambien dashboard por login
    }, 800);
  }

  private focusAlertOrInput() {
    setTimeout(() => {
      const alertEl = document.getElementById('login-error-alert');
      if (alertEl) {
        alertEl.focus();
      } else if (!this.usuario().trim()) {
        document.getElementById('login-usuario')?.focus();
      } else if (!this.password().trim()) {
        document.getElementById('login-password')?.focus();
      }
    }, 50);
  }

  contactarSoporte() {
    const correo = 'soporte@oefa.gob.pe';
    const asunto = encodeURIComponent('[SEOSC-SIGED] Solicitud de Soporte Técnico');
    const cuerpo = encodeURIComponent(
      'Estimado equipo de Soporte OTI,\n\n' +
      'Solicito asistencia técnica con respecto al sistema SEOSC - SIGED.\n\n' +
      'Detalles de la consulta / inconveniente:\n' +
      '- Usuario:\n' +
      '- Descripción:\n\n' +
      'Saludos cordiales.'
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${correo}&su=${asunto}&body=${cuerpo}`;
    window.open(gmailUrl, '_blank');
  }

  abrirCentroAyuda() {
    // En producción: 'https://ayuda.oefa.gob.pe'
    // En desarrollo local: 'http://localhost:3000'
    const url = 'http://localhost:3000';
    window.open(url, '_blank');
  }
}


