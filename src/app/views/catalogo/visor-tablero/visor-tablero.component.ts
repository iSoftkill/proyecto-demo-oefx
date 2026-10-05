import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
    OefaPageLayoutComponent,
    OefaButtonComponent,
    OefaStatusBadgeComponent,
    OefaIconComponent,
    OefaDrawerComponent,
    OefaChipComponent,
    OefaDescriptionListComponent,
    OefaDescriptionItemComponent,
    OefaSpinnerComponent,
    type BreadcrumbItem
} from '../../../shared';

@Component({
    selector: 'app-visor-tablero',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        OefaPageLayoutComponent,
        OefaButtonComponent,
        OefaDrawerComponent,
        OefaChipComponent,
        OefaDescriptionListComponent,
        OefaDescriptionItemComponent,
        OefaSpinnerComponent
    ],
    templateUrl: './visor-tablero.component.html',
    styleUrl: './visor-tablero.component.scss'
})

export class VisorTableroComponent {
    private route = inject(ActivatedRoute);
    private sanitizer = inject(DomSanitizer);

    // Se inicializa de inmediato con el ID de la URL

    tableroId = signal<string>
        (this.route.snapshot.paramMap.get('id') || '');
    tableroTitulo = signal<string>(`Tablero ${this.tableroId()}: texto hardcodeado`);

    urlDashboard = signal<string>(
        'https://lookerstudio.google.com/embed/reporting/c302637b-cd75-41d5-a9fb-0fbfcc1ca678'
    );

    safeUrlDashboard = computed<SafeResourceUrl>(() =>
        this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDashboard())
    );

    // Estado de carga del iframe institucional
    isLoading = signal<boolean>(true);

    onIframeLoad(): void {
        this.isLoading.set(false);
    }




    // Miga de pan: Catálogo activo para retroceder, nombre actual terminal
    breadcrumbs = computed<BreadcrumbItem[]>(() => [
        { label: 'Catálogo de Tableros', url: '/catalogo' },
        { label: this.tableroTitulo() }
    ]);
    // Sidebar Canva para el detalle de "Ficha Técnica"
    isFichaOpen = signal<boolean>(false);
    // Maqueta con los detalles
    FichaTecnica = signal({
        objetivo: 'Monitoreo y seguimiento de los compromisos e intervenciones de fiscalización ambiental en el sector priorizado.',
        proceso: 'Procesos Misionales',
        seccion: 'SUPERVISIÓN',
        tipoTablero: 'Reporte ejecutivo',
        categoria: 'Fiscalización',
        herramientaBI: 'Google Looker Studio',
        fuenteDatos: 'Base de datos institucional (SIGAF / Data Warehouse OEFA)',
        periodicidad: 'Mensual',
        responsable: 'Subdirección de Seguimiento de Entidades de Fiscalización Ambiental',
        observaciones: 'Datos sujetos a corte al cierre del mes calendario.',
        temas: ['Minería', 'Fiscalización', 'Supervisión Ambiental']
    });

}
