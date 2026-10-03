import { Component, signal, inject, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaAppItem } from './app-launcher.models';

export type { OefaAppItem } from './app-launcher.models';

@Component({
  selector: 'oefa-app-launcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-launcher.component.html',
  styleUrls: ['./app-launcher.component.scss']
})
export class OefaAppLauncherComponent {
  private elementRef = inject(ElementRef);

  /** Lista parametrizable de aplicativos y permisos otorgados al usuario (SSO / IAM) */
  @Input() apps: OefaAppItem[] = [];

  /** Identificador de la aplicación en la cual se encuentra el usuario */
  @Input() currentAppId: string = 'seosc';

  /** Título del panel institucional */
  @Input() title: string = 'Aplicativos y Servicios';

  /** URL externa para la solicitud de permisos en Mesa de Ayuda */
  @Input() helpdeskUrl: string = 'https://mesadeayuda.oefa.gob.pe';

  /** Modo de visualización inicial ('grid3x3' | 'list2col') */
  @Input() viewMode: 'grid3x3' | 'list2col' = 'grid3x3';

  /** Evento emitido al seleccionar un aplicativo con permisos */
  @Output() appSelect = new EventEmitter<OefaAppItem>();

  /** Evento emitido al hacer clic en solicitar nuevo acceso */
  @Output() requestAccess = new EventEmitter<void>();

  isOpen = signal(false);
  searchQuery = '';
  selectedCategory: 'all' | 'operativo' | 'gestion' = 'all';

  private defaultApps: OefaAppItem[] = [
    {
      id: 'seosc',
      name: 'SEOSC',
      shortName: 'OS',
      description: 'Órdenes y Entregables',
      category: 'operativo',
      iconBg: '#1D4ED8',
      iconGradient: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
      iconColor: '#FFFFFF',
      iconType: 'checklist',
      hasAccess: true,
      url: '/catalogo'
    },
    {
      id: 'saip',
      name: 'Portal SAIP',
      shortName: 'SA',
      description: 'Acceso a la Información',
      category: 'gestion',
      iconBg: '#059669',
      iconGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      iconColor: '#FFFFFF',
      iconType: 'document',
      hasAccess: true,
      url: '/saip/solicitud'
    },
    {
      id: 'siged',
      name: 'SIGED',
      shortName: 'GD',
      description: 'Gestión Documental',
      category: 'gestion',
      iconBg: '#4F46E5',
      iconGradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
      iconColor: '#FFFFFF',
      iconType: 'folder',
      hasAccess: true
    },
    {
      id: 'sinada',
      name: 'SINADA',
      shortName: 'SN',
      description: 'Denuncias Ambientales',
      category: 'operativo',
      iconBg: '#EA580C',
      iconGradient: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
      iconColor: '#FFFFFF',
      iconType: 'shield',
      hasAccess: true
    },
    {
      id: 'sispa',
      name: 'SISPA',
      shortName: 'SP',
      description: 'Pasivos Ambientales',
      category: 'operativo',
      iconBg: '#7C3AED',
      iconGradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      iconColor: '#FFFFFF',
      iconType: 'environment',
      hasAccess: true
    },
    {
      id: 'mpv',
      name: 'Mesa de Partes',
      shortName: 'MP',
      description: 'Trámite Digital',
      category: 'gestion',
      iconBg: '#0891B2',
      iconGradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
      iconColor: '#FFFFFF',
      iconType: 'inbox',
      hasAccess: true
    },
    {
      id: 'sitra',
      name: 'SITRA OEFA',
      shortName: 'TR',
      description: 'Trámite Interno',
      category: 'gestion',
      iconBg: '#475569',
      iconGradient: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
      iconColor: '#FFFFFF',
      iconType: 'workflow',
      hasAccess: false
    },
    {
      id: 'bi_oefa',
      name: 'Tableros BI',
      shortName: 'BI',
      description: 'Analítica y Métricas',
      category: 'operativo',
      iconBg: '#E11D48',
      iconGradient: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
      iconColor: '#FFFFFF',
      iconType: 'analytics',
      hasAccess: false
    }
  ];

  /** Lista efectiva calculando dinámicamente isCurrentApp según currentAppId */
  get effectiveApps(): OefaAppItem[] {
    const list = this.apps && this.apps.length > 0 ? this.apps : this.defaultApps;
    return list.map(app => ({
      ...app,
      isCurrentApp: app.id === this.currentAppId || !!app.isCurrentApp
    }));
  }

  get accessibleCount(): number {
    return this.effectiveApps.filter(a => a.hasAccess).length;
  }

  get filteredApps(): OefaAppItem[] {
    return this.effectiveApps.filter(app => {
      const matchSearch =
        !this.searchQuery ||
        app.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        app.shortName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchCategory =
        this.selectedCategory === 'all' || app.category === this.selectedCategory;

      return matchSearch && matchCategory;
    });
  }

  toggleMenu(): void {
    this.isOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  onAppClick(app: OefaAppItem, event: Event): void {
    if (!app.hasAccess) {
      event.preventDefault();
      return;
    }
    this.appSelect.emit(app);
    if (!app.url || app.url.startsWith('javascript:')) {
      event.preventDefault();
    }
    this.closeMenu();
  }

  onRequestAccess(event: Event): void {
    event.preventDefault();
    this.closeMenu();
    if (this.requestAccess.observed) {
      this.requestAccess.emit();
    } else if (this.helpdeskUrl) {
      window.open(this.helpdeskUrl, '_blank', 'noopener,noreferrer');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.closeMenu();
    }
  }
}
