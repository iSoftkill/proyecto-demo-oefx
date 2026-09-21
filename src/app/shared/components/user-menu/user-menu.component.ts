import { Component, Input, Output, EventEmitter, signal, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, AppTheme } from '../../../services/theme.service';

export interface UserMenuProfile {
  name: string;
  initials: string;
  role: string;
  email: string;
  area: string;
}

@Component({
  selector: 'oefa-user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);

  @Input() user: UserMenuProfile = {
    name: 'Jerson Alvarez',
    initials: 'JA',
    role: 'Especialista de Seguimiento',
    email: 'jalvarez@oefa.gob.pe',
    area: 'Subdirección de Adm. y Finanzas'
  };

  @Input() helpUrl: string = 'http://localhost:3000';

  @Output() logout = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() changeAreaClick = new EventEmitter<void>();
  @Output() preferencesClick = new EventEmitter<void>();
  @Output() helpClick = new EventEmitter<void>();

  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  closeMenu() {
    this.isOpen.set(false);
  }

  setTheme(theme: AppTheme) {
    this.themeService.setTheme(theme);
  }

  onProfileClick() {
    this.closeMenu();
    this.profileClick.emit();
  }

  onChangeAreaClick() {
    this.closeMenu();
    this.changeAreaClick.emit();
  }

  onPreferencesClick() {
    this.closeMenu();
    this.preferencesClick.emit();
  }

  onHelpClick() {
    this.closeMenu();
    if (this.helpClick.observed) {
      this.helpClick.emit();
    } else {
      window.open(this.helpUrl, '_blank', 'noopener,noreferrer');
    }
  }

  onLogout() {
    this.closeMenu();
    this.logout.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeMenu();
  }
}
