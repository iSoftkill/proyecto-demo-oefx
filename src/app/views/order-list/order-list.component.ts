import { Component, OnInit, signal, computed, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStoreService, OrderData, DeliverableData } from '../../services/order-store.service';
import { OrgStoreService } from '../../services/org-store.service';
import { ProyectoStoreService } from '../../services/proyecto-store.service';
import { OrderFilterStoreService } from '../../services/order-filter-store.service';
import { PoiImportService, PoiImportResult } from '../../services/poi-import.service';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import { OefaPaginationComponent } from '../../shared/components/pagination/pagination.component';
import { OefaSegmentedSwitchComponent, SegmentedOption } from '../../shared/components/segmented-switch/segmented-switch.component';
import { OefaEmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { OefaModalComponent } from '../../shared/components/modal/modal.component';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { OefaProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { OefaDatePickerComponent } from '../../shared/components/date-picker/date-picker.component';
import { OefaDropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { getStatusBadgeClass } from '../../shared/utils/status.utils';

export interface FlatDeliverableItem {
  orderId: string;
  orderNumber: string;
  contractNumber?: string;
  orderYear: string;
  provider: string;
  requestingArea: string;
  deliverableId: string;
  deliverableNum: number;
  deliverableName: string;
  startDate: string;
  daysOffset: number;
  dueDate: string;
  monthText: string;
  amountPercent: number;
  amount: number;
  sigedCode?: string;
  status: DeliverableData['status'];
  projectId?: string;
  proyectoLabel?: string;
  proyectoTipo?: 'PROYECTO' | 'MANTENIMIENTO';
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OefaStatusBadgeComponent,
    OefaButtonComponent,
    OefaIconButtonComponent,
    OefaPaginationComponent,
    OefaSegmentedSwitchComponent,
    OefaEmptyStateComponent,
    OefaModalComponent,
    OefaPageHeaderComponent,
    OefaProgressBarComponent,
    OefaDatePickerComponent,
    OefaDropdownComponent
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orderType: 'OS' | 'OC' = 'OS';
  orders = signal<OrderData[]>([]);

  // View Mode: 'orders' | 'deliverables'
  viewMode = signal<'orders' | 'deliverables'>('orders');

  viewModeOptions: SegmentedOption<'orders' | 'deliverables'>[] = [
    {
      value: 'orders',
      label: 'Vista por Órdenes',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`
    },
    {
      value: 'deliverables',
      label: 'Matriz de Entregables (Excel)',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`
    }
  ];

  // Filters State
  searchQuery = signal<string>('');
  selectedArea = signal<string>('');
  selectedStatus = signal<string>('');
  selectedYear = signal<string>('2026');
  copiedSiged = signal<string | null>(null);

  distinctRequestingAreas = computed(() => {
    const areas = new Set<string>();
    this.orders().forEach(o => {
      if (o.requestingArea) areas.add(o.requestingArea);
    });
    return Array.from(areas).sort();
  });

  // Advanced Filters State
  showAdvancedFilters = signal<boolean>(false);
  dateField = signal<'NOTIFICATION' | 'START' | 'DUE'>('NOTIFICATION');
  dateFrom = signal<string>('');
  dateTo = signal<string>('');
  contractorType = signal<string>('');
  amountMin = signal<number | null>(null);
  amountMax = signal<number | null>(null);
  selectedProyecto = signal<string>('');

  // Mobile Filter Drawer State & Status Chips
  isMobileFilterDrawerOpen = signal<boolean>(false);

  // Opciones de estado según modo de vista (OS vs Entregables)
  readonly orderStatusOptions = [
    { label: 'Todos', value: '' },
    { label: 'En Proceso', value: 'EN_PROCESO' },
    { label: 'Finalizado', value: 'FINALIZADO' },
    { label: 'Desestimado', value: 'DESESTIMADO' }
  ];

  readonly deliverableStatusOptions = [
    { label: 'Todos', value: '' },
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'En Revisión', value: 'EN_REVISION' },
    { label: 'Observado', value: 'OBSERVADO' },
    { label: 'Pend. Firma', value: 'PENDIENTE_FIRMA' },
    { label: 'Atendido', value: 'ATENDIDO' },
    { label: 'Previsión', value: 'PREVISIÓN' }
  ];

  currentStatusOptions = computed(() => {
    return this.viewMode() === 'orders' 
      ? this.orderStatusOptions 
      : this.deliverableStatusOptions;
  });

  changeViewMode(mode: 'orders' | 'deliverables') {
    this.viewMode.set(mode);
    this.selectedStatus.set('');
    this.currentPage.set(1);
    this.matrixCurrentPage.set(1);
  }

  activeFiltersCount = computed<number>(() => {
    let count = 0;
    if (this.selectedArea()) count++;
    if (this.selectedStatus()) count++;
    if (this.selectedYear()) count++;
    if (this.dateFrom() || this.dateTo()) count++;
    if (this.contractorType()) count++;
    if ((this.amountMin() !== null && this.amountMin()! > 0) || (this.amountMax() !== null && this.amountMax()! > 0)) count++;
    if (this.selectedProyecto()) count++;
    return count;
  });

  openFilterDrawer() {
    this.isMobileFilterDrawerOpen.set(true);
  }

  closeFilterDrawer() {
    this.isMobileFilterDrawerOpen.set(false);
  }

  selectStatusChip(status: string) {
    this.selectedStatus.set(status);
    this.currentPage.set(1);
    this.matrixCurrentPage.set(1);
  }

  // Side Canvas Drawer State
  selectedDeliverable = signal<FlatDeliverableItem | null>(null);
  selectedOrderDrawer = signal<OrderData | null>(null);

  public proyectoStoreService = inject(ProyectoStoreService);
  private filterStoreService = inject(OrderFilterStoreService);
  private poiImportService = inject(PoiImportService);
  private elementRef = inject(ElementRef);

  // POI Excel Import State
  isImportingPoi = signal<boolean>(false);
  poiImportResult = signal<PoiImportResult | null>(null);
  poiImportError = signal<string | null>(null);
  showCreateDropdown = signal<boolean>(false);
  showKebabMenu = signal<boolean>(false);

  // Table Sorting State
  sortColumn = signal<string>('number');
  sortDirection = signal<'asc' | 'desc'>('desc');

  toggleSort(col: string) {
    if (this.sortColumn() === col) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col);
      this.sortDirection.set(col === 'number' || col === 'date' || col === 'amount' ? 'desc' : 'asc');
    }
  }

  formatOrderNumber(num?: string): string {
    if (!num) return '';
    const matchYearFirst = num.match(/^(\d{4})-(\d+)$/);
    if (matchYearFirst) {
      return `${matchYearFirst[2]}-${matchYearFirst[1]}`;
    }
    const matchPrefix = num.match(/^(?:OS|OC)-(\d+)-(\d{4})$/i);
    if (matchPrefix) {
      return `${matchPrefix[1]}-${matchPrefix[2]}`;
    }
    return num;
  }

  // ── Paginación Vista Órdenes ───────────────────────────────────────────────
  pageSize = signal<number>(10);
  currentPage = signal<number>(1);
  pageSizeOptions = [10, 25, 50, 100];

  totalOrders = computed(() => this.filteredOrders().length);
  totalPages = computed(() => Math.ceil(this.totalOrders() / this.pageSize()) || 1);

  paginatedOrders = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredOrders().slice(start, start + this.pageSize());
  });

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage.set(p);
    }
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  onPageSizeChange(val: any) {
    const size = Number(val);
    if (!isNaN(size) && size > 0) {
      this.pageSize.set(size);
      this.currentPage.set(1);
    }
  }

  // ── Paginación Vista Matriz Entregables (agrupada por orden completa) ───────
  matrixPageSize = signal<number>(10);
  matrixCurrentPage = signal<number>(1);
  matrixPageSizeOptions = [10, 25, 50, 100];

  distinctMatrixOrderIds = computed(() => {
    const ids: string[] = [];
    this.flatDeliverables().forEach(d => {
      if (!ids.includes(d.orderId)) ids.push(d.orderId);
    });
    return ids;
  });

  totalMatrixOrders = computed(() => this.distinctMatrixOrderIds().length);
  totalMatrixPages = computed(() => Math.ceil(this.totalMatrixOrders() / this.matrixPageSize()) || 1);

  paginatedFlatDeliverables = computed(() => {
    const start = (this.matrixCurrentPage() - 1) * this.matrixPageSize();
    const visibleIds = new Set(this.distinctMatrixOrderIds().slice(start, start + this.matrixPageSize()));
    return this.flatDeliverables().filter(d => visibleIds.has(d.orderId));
  });

  goToMatrixPage(p: number) {
    if (p >= 1 && p <= this.totalMatrixPages()) {
      this.matrixCurrentPage.set(p);
    }
  }

  nextMatrixPage() {
    this.goToMatrixPage(this.matrixCurrentPage() + 1);
  }

  prevMatrixPage() {
    this.goToMatrixPage(this.matrixCurrentPage() - 1);
  }

  onMatrixPageSizeChange(val: any) {
    const size = Number(val);
    if (!isNaN(size) && size > 0) {
      this.matrixPageSize.set(size);
      this.matrixCurrentPage.set(1);
    }
  }

  getPageNumbers(current: number, total: number): number[] {
    const pages: number[] = [];
    const maxButtons = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getPaginationInfo(current: number, size: number, total: number): string {
    if (total === 0) return 'Sin registros';
    const start = (current - 1) * size + 1;
    const end = Math.min(current * size, total);
    return `Mostrando ${start} - ${end} de ${total}`;
  }

  toggleCreateDropdown() {
    this.showCreateDropdown.update(v => !v);
    if (this.showCreateDropdown()) {
      this.showKebabMenu.set(false);
    }
  }

  closeCreateDropdown() {
    this.showCreateDropdown.set(false);
  }

  toggleKebabMenu() {
    this.showKebabMenu.update(v => !v);
    if (this.showKebabMenu()) {
      this.showCreateDropdown.set(false);
    }
  }

  closeKebabMenu() {
    this.showKebabMenu.set(false);
  }

  goToCreateFromKebab() {
    this.closeKebabMenu();
    this.goToCreate();
  }

  importPoiFromKebab(fileInput: HTMLInputElement) {
    this.closeKebabMenu();
    fileInput.click();
  }

  exportCsvFromKebab() {
    this.closeKebabMenu();
    this.exportToCsv();
  }

  resetCacheFromKebab() {
    this.closeKebabMenu();
    this.resetCache();
  }

  onPoiFileSelected(event: Event) {
    this.showCreateDropdown.set(false);
    this.showKebabMenu.set(false);
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isImportingPoi.set(true);
    this.poiImportError.set(null);
    this.poiImportResult.set(null);

    this.poiImportService.importarExcel(file).subscribe({
      next: (res) => {
        this.isImportingPoi.set(false);
        this.poiImportResult.set(res);
        input.value = '';
        this.orderStoreService.fetchFromBackend();
      },
      error: (err) => {
        this.isImportingPoi.set(false);
        const errorMsg = typeof err.error === 'string' ? err.error : (err.message || 'Error al importar archivo');
        this.poiImportError.set(errorMsg);
        input.value = '';
      }
    });
  }

  closePoiModal() {
    this.poiImportResult.set(null);
    this.poiImportError.set(null);
  }

  openDeliverableDrawer(row: FlatDeliverableItem) {
    this.selectedDeliverable.set(row);
  }

  closeDeliverableDrawer() {
    this.selectedDeliverable.set(null);
  }

  openOrderDrawer(order: OrderData) {
    this.selectedOrderDrawer.set(order);
  }

  closeOrderDrawer() {
    this.selectedOrderDrawer.set(null);
  }

  @HostListener('window:keydown.escape')
  onEscKey() {
    if (this.selectedOrderDrawer()) {
      this.closeOrderDrawer();
    }
    if (this.selectedDeliverable()) {
      this.closeDeliverableDrawer();
    }
    if (this.showCreateDropdown()) {
      this.closeCreateDropdown();
    }
    if (this.showKebabMenu()) {
      this.closeKebabMenu();
    }
    if (this.poiImportResult() || this.poiImportError()) {
      this.closePoiModal();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.showCreateDropdown() && !this.elementRef.nativeElement.querySelector('.dropdown-create-container')?.contains(target)) {
      this.showCreateDropdown.set(false);
    }
    if (this.showKebabMenu() && !this.elementRef.nativeElement.querySelector('.kebab-menu-container')?.contains(target)) {
      this.showKebabMenu.set(false);
    }
  }

  hasActiveAdvancedFilters = computed(() => {
    return Boolean(
      this.dateFrom() || 
      this.dateTo() || 
      this.contractorType() || 
      (this.amountMin() !== null && this.amountMin() !== undefined && this.amountMin()! > 0) || 
      (this.amountMax() !== null && this.amountMax() !== undefined && this.amountMax()! > 0) ||
      this.selectedProyecto()
    );
  });

  hasAnyActiveFilter = computed(() => {
    return Boolean(
      this.searchQuery() || 
      this.selectedArea() || 
      this.selectedStatus() || 
      this.selectedYear() || 
      this.hasActiveAdvancedFilters()
    );
  });

  clearAllFilters() {
    this.searchQuery.set('');
    this.selectedArea.set('');
    this.selectedStatus.set('');
    this.selectedYear.set('');
    this.dateField.set('NOTIFICATION');
    this.dateFrom.set('');
    this.dateTo.set('');
    this.contractorType.set('');
    this.amountMin.set(null);
    this.amountMax.set(null);
    this.selectedProyecto.set('');
    this.filterStoreService.clearState(this.orderType);
  }

  private toIsoDate(dateStr?: string): string {
    if (!dateStr) return '';
    if (dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
    return dateStr;
  }

  // Computed: Filtered Orders
  filteredOrders = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const area = this.selectedArea();
    const status = this.selectedStatus();
    const year = this.selectedYear();
    const dField = this.dateField();
    const dFrom = this.dateFrom();
    const dTo = this.dateTo();
    const cType = this.contractorType();
    const aMin = this.amountMin();
    const aMax = this.amountMax();
    const proyId = this.selectedProyecto();

    const result = this.orders().filter(o => {
      const yr = o.notificationDate.includes('/') ? o.notificationDate.split('/')[2] : (o.notificationDate.split('-')[0] || '2026');
      if (year && yr !== year) return false;
      if (area && !o.requestingArea.toLowerCase().includes(area.toLowerCase())) return false;
      if (status && o.status !== status) return false;

      // Proyecto / Mantenimiento filter (solo a nivel entregable)
      if (proyId) {
        const matchesAnyDeliverable = (o.deliverables || []).some(d => d.projectId === proyId);
        if (!matchesAnyDeliverable) return false;
      }

      // Dates range filter based on dateField
      if (dFrom || dTo) {
        if (dField === 'NOTIFICATION') {
          const iso = this.toIsoDate(o.notificationDate);
          if (dFrom && iso && iso < dFrom) return false;
          if (dTo && iso && iso > dTo) return false;
        } else if (dField === 'START') {
          const hasMatchingDel = (o.deliverables || []).some(d => {
            const iso = this.toIsoDate(d.startDate || o.notificationDate);
            if (dFrom && iso && iso < dFrom) return false;
            if (dTo && iso && iso > dTo) return false;
            return true;
          });
          if (!hasMatchingDel) return false;
        } else if (dField === 'DUE') {
          const hasMatchingDel = (o.deliverables || []).some(d => {
            const iso = this.toIsoDate(d.dueDate);
            if (dFrom && iso && iso < dFrom) return false;
            if (dTo && iso && iso > dTo) return false;
            return true;
          });
          if (!hasMatchingDel) return false;
        }
      }

      // Contractor Type filter
      if (cType) {
        const ct = (o.contractorType || '').toUpperCase();
        if (cType === 'JURÍDICA' && !ct.includes('JURÍDICA') && !ct.includes('JURIDICA')) return false;
        if (cType === 'LOCADOR' && !ct.includes('LOCADOR') && !ct.includes('NATURAL')) return false;
      }

      // Amounts range filter
      if (aMin !== null && aMin !== undefined && aMin > 0 && o.totalAmount < aMin) return false;
      if (aMax !== null && aMax !== undefined && aMax > 0 && o.totalAmount > aMax) return false;

      if (q) {
        return (
          o.number.toLowerCase().includes(q) ||
          o.provider.toLowerCase().includes(q) ||
          o.ruc.includes(q) ||
          o.serviceDescription.toLowerCase().includes(q)
        );
      }
      return true;
    });

    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;

    return result.sort((a: OrderData, b: OrderData) => {
      let valA: any = '';
      let valB: any = '';

      switch (col) {
        case 'number':
          valA = a.number || '';
          valB = b.number || '';
          break;
        case 'provider':
          valA = (a.provider || '').toLowerCase();
          valB = (b.provider || '').toLowerCase();
          break;
        case 'area':
          valA = (a.requestingArea || '').toLowerCase();
          valB = (b.requestingArea || '').toLowerCase();
          break;
        case 'date':
          valA = this.toIsoDate(a.notificationDate);
          valB = this.toIsoDate(b.notificationDate);
          break;
        case 'amount':
          valA = a.totalAmount || 0;
          valB = b.totalAmount || 0;
          break;
        case 'status':
          valA = a.status || '';
          valB = b.status || '';
          break;
        default:
          valA = a.number || '';
          valB = b.number || '';
      }

      if (valA < valB) return -1 * dir;
      if (valA > valB) return 1 * dir;
      return 0;
    });
  });

  // Computed: Flat Deliverables Array (Matriz Excel)
  flatDeliverables = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const area = this.selectedArea();
    const status = this.selectedStatus();
    const year = this.selectedYear();
    const dField = this.dateField();
    const dFrom = this.dateFrom();
    const dTo = this.dateTo();
    const cType = this.contractorType();
    const aMin = this.amountMin();
    const aMax = this.amountMax();
    const proyId = this.selectedProyecto();

    const rows: FlatDeliverableItem[] = [];

    this.orders().forEach(o => {
      const yr = o.notificationDate.includes('/') ? o.notificationDate.split('/')[2] : (o.notificationDate.split('-')[0] || '2026');
      if (year && yr !== year) return;
      if (area && !o.requestingArea.toLowerCase().includes(area.toLowerCase())) return;

      if (cType) {
        const ct = (o.contractorType || '').toUpperCase();
        if (cType === 'JURÍDICA' && !ct.includes('JURÍDICA') && !ct.includes('JURIDICA')) return;
        if (cType === 'LOCADOR' && !ct.includes('LOCADOR') && !ct.includes('NATURAL')) return;
      }

      if (aMin !== null && aMin !== undefined && aMin > 0 && o.totalAmount < aMin) return;
      if (aMax !== null && aMax !== undefined && aMax > 0 && o.totalAmount > aMax) return;

      (o.deliverables || []).forEach((d, idx) => {
        if (status && d.status !== status) return;

        // Proyecto / Mantenimiento filter on deliverable (sin herencia de orden)
        if (proyId && d.projectId !== proyId) return;

        // Date range filter for individual deliverable rows
        if (dFrom || dTo) {
          let iso = '';
          if (dField === 'NOTIFICATION') iso = this.toIsoDate(o.notificationDate);
          else if (dField === 'START') iso = this.toIsoDate(d.startDate || o.notificationDate);
          else if (dField === 'DUE') iso = this.toIsoDate(d.dueDate);

          if (dFrom && iso && iso < dFrom) return;
          if (dTo && iso && iso > dTo) return;
        }

        // Month text calculation from dueDate
        let monthText = '-';
        if (d.dueDate) {
          const parts = d.dueDate.includes('/') ? d.dueDate.split('/') : d.dueDate.split('-');
          if (parts.length === 3) {
            const m = parseInt(parts[1], 10);
            const y = d.dueDate.includes('/') ? parts[2] : parts[0];
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
            monthText = (months[m - 1] || '') + ' ' + y;
          }
        }

        const proyObj = d.projectId ? this.proyectoStoreService.getById(d.projectId) : undefined;

        rows.push({
          orderId: o.id,
          orderNumber: o.number,
          contractNumber: o.contractNumber || o.number,
          orderYear: yr,
          provider: o.provider,
          requestingArea: o.requestingArea,
          deliverableId: d.id,
          deliverableNum: idx + 1,
          deliverableName: d.name,
          startDate: d.startDate || o.notificationDate,
          daysOffset: d.daysOffset || 30,
          dueDate: d.dueDate,
          monthText: monthText,
          amountPercent: d.amountPercent || 0,
          amount: d.amount || 0,
          sigedCode: d.sigedCode,
          status: d.status,
          projectId: d.projectId,
          proyectoLabel: proyObj ? `[${proyObj.tipo === 'PROYECTO' ? 'PRY' : 'MNT'}] ${proyObj.codigo}` : 'Sin proyecto asociado',
          proyectoTipo: proyObj?.tipo
        });
      });
    });

    if (q) {
      return rows.filter(r => 
        r.orderNumber.toLowerCase().includes(q) ||
        (r.contractNumber && r.contractNumber.toLowerCase().includes(q)) ||
        r.provider.toLowerCase().includes(q) ||
        r.deliverableName.toLowerCase().includes(q) ||
        (r.sigedCode && r.sigedCode.toLowerCase().includes(q))
      );
    }

    return rows;
  });

  getProyectoBadgesForOrder(order: OrderData): { label: string; tipo: 'PROYECTO' | 'MANTENIMIENTO' }[] {
    const ids = Array.from(new Set((order.deliverables || []).map(d => d.projectId).filter(Boolean)));
    const badges: { label: string; tipo: 'PROYECTO' | 'MANTENIMIENTO' }[] = [];
    ids.forEach(id => {
      const p = this.proyectoStoreService.getById(id!);
      if (p) {
        badges.push({ label: `[${p.tipo === 'PROYECTO' ? 'PRY' : 'MNT'}] ${p.codigo}`, tipo: p.tipo });
      }
    });
    return badges;
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private orderStoreService: OrderStoreService,
    public orgStoreService: OrgStoreService
  ) {}

  exportToCsv() {
    let csvContent = '\uFEFF'; // UTF-8 BOM para Excel
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `${this.orderType}_export_${dateStr}.csv`;

    if (this.viewMode() === 'orders') {
      const headers = ['N° Orden', 'N° Contrato', 'Tipo', 'RUC', 'Proveedor', 'Tipo Contratista', 'Área Solicitante', 'Descripción Servicio', 'Fecha Notificación', 'Monto Total S/', '% Avance', 'Estado', 'Proyectos'];
      csvContent += headers.map(h => `"${h}"`).join(',') + '\n';

      this.filteredOrders().forEach(o => {
        const proysText = this.getProyectoBadgesForOrder(o).map(b => b.label).join(' | ') || 'Sin proyecto asociado';
        const row = [
          o.number,
          o.contractNumber || 'SIN CONTRATO',
          o.type,
          o.ruc,
          o.provider,
          o.contractorType || 'PERSONA JURÍDICA',
          o.requestingArea,
          o.serviceDescription.replace(/"/g, '""'),
          this.formatDateToDDMMYYYY(o.notificationDate),
          o.totalAmount,
          o.progressPercent + '%',
          o.status,
          proysText
        ];
        csvContent += row.map(val => `"${val}"`).join(',') + '\n';
      });
    } else {
      const headers = ['N° Orden', 'N° Contrato', 'Año', 'Proveedor', 'Área Solicitante', 'N° Entregable', 'Nombre Entregable', 'Fecha Inicio', 'Días Plazo', 'Fecha Vencimiento', 'Mes Programado', 'Monto Entregable S/', '% Monto', 'Código SIGED', 'Estado', 'Proyecto'];
      csvContent += headers.map(h => `"${h}"`).join(',') + '\n';

      this.flatDeliverables().forEach(d => {
        const row = [
          d.orderNumber,
          d.contractNumber || 'SIN CONTRATO',
          d.orderYear,
          d.provider,
          d.requestingArea,
          'Entregable N° ' + d.deliverableNum,
          d.deliverableName.replace(/"/g, '""'),
          this.formatDateToDDMMYYYY(d.startDate),
          d.daysOffset + ' días',
          this.formatDateToDDMMYYYY(d.dueDate),
          d.monthText,
          d.amount,
          d.amountPercent + '%',
          d.sigedCode || '-',
          d.status,
          d.proyectoLabel || 'Sin proyecto asociado'
        ];
        csvContent += row.map(val => `"${val}"`).join(',') + '\n';
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments[0]?.path || '';
      this.orderType = path.includes('compra') ? 'OC' : 'OS';
      this.loadData();
    });
  }

  loadData() {
    this.currentPage.set(1);
    this.matrixCurrentPage.set(1);
    const list = this.orderStoreService.getOrdersByType(this.orderType);
    this.orders.set(list);

    const savedState = this.filterStoreService.getState(this.orderType);
    if (savedState) {
      this.viewMode.set(savedState.viewMode || 'orders');
      this.searchQuery.set(savedState.searchQuery || '');
      this.selectedArea.set(savedState.selectedArea || '');
      this.selectedStatus.set(savedState.selectedStatus || '');
      this.selectedYear.set(savedState.selectedYear || '2026');
      this.showAdvancedFilters.set(Boolean(savedState.showAdvancedFilters));
      this.dateField.set(savedState.dateField || 'NOTIFICATION');
      this.dateFrom.set(savedState.dateFrom || '');
      this.dateTo.set(savedState.dateTo || '');
      this.contractorType.set(savedState.contractorType || '');
      this.amountMin.set(savedState.amountMin ?? null);
      this.amountMax.set(savedState.amountMax ?? null);
      this.selectedProyecto.set(savedState.selectedProyecto || '');

      if (savedState.scrollY && savedState.scrollY > 0) {
        setTimeout(() => {
          window.scrollTo({ top: savedState.scrollY, behavior: 'instant' });
        }, 60);
      }
    }
  }

  resetCache() {
    if (confirm('¿Desea restablecer las órdenes mock en cache?')) {
      this.orderStoreService.resetCache();
      this.loadData();
    }
  }

  // Rowspan Helpers for Option A
  shouldShowOrderCell(rows: FlatDeliverableItem[], index: number): boolean {
    if (index === 0) return true;
    return rows[index].orderId !== rows[index - 1].orderId;
  }

  getOrderRowspan(rows: FlatDeliverableItem[], index: number): number {
    const currentOrderId = rows[index].orderId;
    let count = 0;
    for (let i = index; i < rows.length; i++) {
      if (rows[i].orderId === currentOrderId) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  /** @deprecated Usa <oefa-status-badge [status]="..."> en el template. Delegado al utility compartido. */
  getStatusClass(status: string): string {
    return getStatusBadgeClass(status);
  }

  goToDetail(id: string) {
    this.filterStoreService.saveState(this.orderType, {
      viewMode: this.viewMode(),
      searchQuery: this.searchQuery(),
      selectedArea: this.selectedArea(),
      selectedStatus: this.selectedStatus(),
      selectedYear: this.selectedYear(),
      showAdvancedFilters: this.showAdvancedFilters(),
      dateField: this.dateField(),
      dateFrom: this.dateFrom(),
      dateTo: this.dateTo(),
      contractorType: this.contractorType(),
      amountMin: this.amountMin(),
      amountMax: this.amountMax(),
      selectedProyecto: this.selectedProyecto(),
      scrollY: window.scrollY || 0
    });
    this.router.navigate(['/ordenes', id]);
  }

  formatDateToDDMMYYYY(dateStr?: string): string {
    if (!dateStr) return '-';
    if (dateStr.includes('/')) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [yyyy, mm, dd] = parts;
      return dd.padStart(2, '0') + '/' + mm.padStart(2, '0') + '/' + yyyy;
    }
    return dateStr;
  }

  goToCreate() {
    this.router.navigate(['/nueva-orden']);
  }

  copyToClipboard(text: string, event: MouseEvent): void {
    event.stopPropagation();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      this.copiedSiged.set(text);
      setTimeout(() => {
        if (this.copiedSiged() === text) {
          this.copiedSiged.set(null);
        }
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar al portapapeles:', err);
    });
  }
}
