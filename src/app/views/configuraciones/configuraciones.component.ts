import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  OefaPageLayoutComponent,
  OefaButtonComponent,
  OefaIconComponent,
  OefaProcessCardComponent,
  OefaCardComponent,
} from '../../shared';

export interface CifraItem {
  icon: string;
  number: string;
  label: string;
}

export interface DestacadoItem {
  date: string;
  category: string;
  title: string;
  url?: string;
}

/**
 * Vista de Inicio Institucional para Sistema Cerrado / Operativo OEFA.
 * Sigue el estándar de gestión: Header estándar (<oefa-page-header>) + contenedor .oefa-page + Zero CSS.
 */
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    OefaButtonComponent,
    OefaIconComponent,
    OefaProcessCardComponent,
    OefaCardComponent,
    OefaPageLayoutComponent
  ],
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent {
  private router = inject(Router);

  cifras: CifraItem[] = [
    { icon: 'chart', number: '36', label: 'Tableros y\nreportes' },
    { icon: 'layers', number: '2', label: 'Procesos' },
    { icon: 'layout', number: '10', label: 'Secciones' },
    { icon: 'tag', number: '7', label: 'Categorías' }
  ];

  destacados: DestacadoItem[] = [
    {
      date: '18-SET',
      category: 'TRANSVERSAL',
      title: 'Reporte: Ejecución de metas Planefa',
      url: '/catalogo'
    },
    {
      date: '18-SET',
      category: 'SMER',
      title: 'SMER Seguimiento metas Planefa',
      url: '/catalogo'
    },
    {
      date: '15-SET',
      category: 'SUPERVISIÓN',
      title: 'Fiscalización Directa en Minería y Energía',
      url: '/catalogo'
    }
  ];

  onExploreProcess(processName: string): void {
    this.router.navigate(['/catalogo']);
  }

  onSelectDestacado(item: DestacadoItem): void {
    if (item.url) {
      this.router.navigateByUrl(item.url);
    }
  }
}