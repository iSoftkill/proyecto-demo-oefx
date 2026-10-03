import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import { OefaIconComponent } from '../../shared/components/icon/icon.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaDotBadgeComponent } from '../../shared/components/dot-badge/dot-badge.component';
import { OefaChipComponent } from '../../shared/components/chip/chip.component';
import { OefaFormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { OefaBentoKpiTileComponent } from '../../shared/components/bento-kpi-tile/bento-kpi-tile.component';
import { OefaCatalogCardComponent } from '../../shared/components/catalog-card/catalog-card.component';
import { OefaAlertComponent } from '../../shared/components/alert/alert.component';
import { OefaSelectionCardComponent } from '../../shared/components/selection-card/selection-card.component';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker.component';
import { OefaDateRangePickerComponent, OefaDateRange } from '../../shared/components/date-range-picker/date-range-picker.component';
import { OefaFileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';
import { OefaSegmentedSwitchComponent, SegmentedOption } from '../../shared/components/segmented-switch/segmented-switch.component';
import { OefaPaginationComponent } from '../../shared/components/pagination/pagination.component';
import { OefaEmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { OefaTabsComponent, OefaTabItem } from '../../shared/components/tabs/tabs.component';
import { OefaStepperComponent, OefaStepItem } from '../../shared/components/stepper/stepper.component';
import { OefaPageHeaderComponent, BreadcrumbItem } from '../../shared/components/page-header/page-header.component';
import { OefaTableComponent, TableColumn } from '../../shared/components/table/table.component';
import { OefaInfoTooltipComponent } from '../../shared/components/info-tooltip/info-tooltip.component';
import { OefaSkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { OefaSpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { OefaAppLauncherComponent } from '../../shared/components/app-launcher/app-launcher.component';
import { UserMenuComponent } from '../../shared/components/user-menu/user-menu.component';

@Component({
  selector: 'app-design-system-executive-pdf',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OefaButtonComponent, 
    OefaIconButtonComponent,
    OefaIconComponent,
    OefaStatusBadgeComponent,
    OefaDotBadgeComponent,
    OefaChipComponent,
    OefaFormFieldComponent,
    OefaBentoKpiTileComponent,
    OefaCatalogCardComponent,
    OefaAlertComponent,
    OefaSelectionCardComponent,
    DatePickerComponent,
    OefaDateRangePickerComponent,
    OefaFileUploaderComponent,
    OefaSegmentedSwitchComponent,
    OefaPaginationComponent,
    OefaEmptyStateComponent,
    OefaTabsComponent,
    OefaStepperComponent,
    OefaPageHeaderComponent,
    OefaTableComponent,
    OefaInfoTooltipComponent,
    OefaSkeletonComponent,
    OefaSpinnerComponent,
    OefaAppLauncherComponent,
    UserMenuComponent
  ],
  templateUrl: './design-system-executive-pdf.component.html',
  styleUrls: ['./design-system-executive-pdf.component.scss']
})
export class DesignSystemExecutivePdfComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef<HTMLElement>;

  isGenerating = signal<boolean>(false);

  // Estados demostrativos para conmutador segmentado (Switch)
  selectedSwitchView = 'orders';
  selectedSwitchFilter = 'pendientes';
  execSwitchOptions: SegmentedOption[] = [
    {
      value: 'orders',
      label: 'Vista Órdenes',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
      badge: 48
    },
    {
      value: 'matrix',
      label: 'Matriz Excel',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
      tooltip: 'Cuadrícula matricial orientada a entregables de pago'
    }
  ];
  execSwitchAlertOptions: SegmentedOption[] = [
    { value: 'todos', label: 'Todos los Expedientes' },
    { value: 'pendientes', label: 'Requiere Acción', dotBadge: true, tooltip: '5 órdenes requieren firma o visto bueno' },
    { value: 'observados', label: 'Observados', badge: 3, tooltip: 'Entregables con plazo de subsanación' }
  ];

  // Estados demostrativos para Paginación
  paginationCurrentPage = 2;
  paginationPageSize = 10;
  paginationTotalItems = 128;

  // Estados demostrativos para Dropdowns
  isDropdownActionsOpen = false;
  isDropdownExportOpen = false;

  // Estados demostrativos para tarjetas de selección
  selectedDelivery = 'digital';
  notifEmail = true;
  notifSms = false;
  notifGeo = true;

  // Estados demostrativos para fechas
  sampleDateStart = '2026-03-24';
  sampleDateDeadline = '2026-04-15';
  sampleDateDisabled = '2026-01-01';
  sampleRange: OefaDateRange = { start: '2026-03-01', end: '2026-06-30' };
  sampleRangeAlert: OefaDateRange = { start: '2026-01-01', end: '2026-08-31' };

  // Estados demostrativos para Pestañas (Tabs)
  activeTabUnderline = 'entregables';
  execTabsUnderline: OefaTabItem[] = [
    { id: 'generales', label: 'Datos Generales' },
    { id: 'entregables', label: 'Entregables & Informes', badge: 4, infoTooltip: '4 entregables registrados para revisión' },
    { id: 'conformidad', label: 'Conformidad de Pago', badgeDot: true, badgeDotColor: 'warning', infoTooltip: 'Pendiente de firma del responsable' },
    { id: 'historial', label: 'Historial', disabled: false }
  ];

  activeTabPill = 'mensual';
  execTabsPill: OefaTabItem[] = [
    { id: 'diario', label: 'Día' },
    { id: 'semanal', label: 'Semana' },
    { id: 'mensual', label: 'Mes Actual', badge: 'Activo' },
    { id: 'anual', label: 'Consolidado Anual', badgeDot: true, badgeDotColor: 'primary' }
  ];

  // Estados demostrativos para Steppers
  currentStepHorizontal = 2;
  execStepperHorizontal: OefaStepItem[] = [
    { title: 'Requisitos', description: 'Carga de bases' },
    { title: 'Asignación', description: 'Técnico responsable' },
    { title: 'Ejecución', description: 'Revisión técnica' },
    { title: 'Conformidad', description: 'Emisión de pago' }
  ];

  currentStepVertical = 3;
  execStepperVertical: OefaStepItem[] = [
    { title: 'Ingreso de Solicitud', description: 'Registro con firma digital de la coordinación' },
    { title: 'Aprobación Presupuestal', description: 'Validación de certificación y metas POI' },
    { title: 'Supervisión en Campo', description: 'Inspección técnica ambiental en desarrollo' },
    { title: 'Cierre y Archivo', description: 'Notificación final al administrado' }
  ];

  nextStepHorizontal(): void {
    if (this.currentStepHorizontal < this.execStepperHorizontal.length) {
      this.currentStepHorizontal++;
    }
  }

  prevStepHorizontal(): void {
    if (this.currentStepHorizontal > 1) {
      this.currentStepHorizontal--;
    }
  }


  // Estados demostrativos para Page Header
  execHeaderBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/design-system' },
    { label: 'Órdenes de Servicio', url: '/design-system' },
    { label: 'Expediente OSOC-2026-0842' }
  ];

  // Estados demostrativos para Tabla de Datos y Matriz
  execTableColumns: TableColumn[] = [
    { key: 'code', header: 'N° Orden', width: '135px', type: 'mono', sortable: true },
    { key: 'provider', header: 'Proveedor / Razón Social', sortable: true },
    { key: 'emissionDate', header: 'Fecha Emisión', width: '120px', type: 'date', sortable: true },
    { 
      key: 'amount', 
      header: 'Monto Total', 
      width: '130px', 
      align: 'right', 
      type: 'currency', 
      sortable: true,
      formatter: (val: number) => 'S/ ' + val.toLocaleString('es-PE', { minimumFractionDigits: 2 })
    },
    { key: 'status', header: 'Estado', width: '145px', align: 'center', type: 'badge' }
  ];

  execTableData = [
    { code: 'ORD-2026-00142', provider: 'SERVICIOS AMBIENTALES DEL SUR S.A.C.', emissionDate: '2026-03-12', amount: 48500.00, status: 'CONFORME' },
    { code: 'ORD-2026-00143', provider: 'LABORATORIOS ANALÍTICOS PERÚ S.A.', emissionDate: '2026-03-15', amount: 12800.50, status: 'EN_PROCESO' },
    { code: 'ORD-2026-00144', provider: 'INGENIERÍA & SUPERVISIÓN AMBIENTAL E.I.R.L.', emissionDate: '2026-03-18', amount: 89700.00, status: 'OBSERVADO' },
    { code: 'ORD-2026-00145', provider: 'GEO-CONSULTORES AMBIENTALES S.R.L.', emissionDate: '2026-03-20', amount: 34200.00, status: 'BORRADOR' }
  ];

  exportToPdf(): void {
    // Inyecta clase temporal para aplicar modo ficha ejecutiva en A4 landscape
    document.body.classList.add('is-printing-executive-pdf');

    const cleanup = () => {
      document.body.classList.remove('is-printing-executive-pdf');
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);

    // Breve pausa para asegurar aplicación de estilos antes del diálogo
    setTimeout(() => {
      window.print();
    }, 50);

    // Fallback de seguridad si afterprint no es soportado
    setTimeout(() => {
      cleanup();
    }, 2500);
  }
}
