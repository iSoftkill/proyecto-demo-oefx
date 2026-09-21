import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderStoreService, DeliverableData, DeliverableStatus } from '../../services/order-store.service';
import { OrgStoreService } from '../../services/org-store.service';
import { ProyectoStoreService } from '../../services/proyecto-store.service';

export interface GeneratedDeliverable {
  id: number;
  name: string;
  startDate: string; // Fecha inicial (permanente)
  daysOffset: number; // Plazo en días calendario
  dueDate: string; // Fecha límite calculada
  amountPercent: number;
  calculatedAmount: number;
  /** Fuente de verdad del proyecto asignado a este entregable (nullable) */
  projectId?: string;
}

@Component({
  selector: 'app-new-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-order-form.component.html',
  styleUrl: './new-order-form.component.css'
})
export class NewOrderFormComponent {
  orderForm: FormGroup;
  currentStep = signal<number>(1);
  isRecurrent = false;

  // Casuística: NEXT_DAY (Al día siguiente - LPAG) vs SAME_DAY (El mismo día)
  startDayRule: 'NEXT_DAY' | 'SAME_DAY' = 'NEXT_DAY';

  generatedDeliverables = signal<GeneratedDeliverable[]>([]);

  // Current year auto-detected (2026)
  currentYear = new Date().getFullYear();

  isDuplicateOrder = signal<boolean>(false);

  // Computed formatted order code
  formattedCode = signal<string>('OS-00000-2026');

  // Sum of percentages across rows
  totalPercentSum = computed(() => {
    const list = this.generatedDeliverables();
    return Math.round(list.reduce((sum, item) => sum + (Number(item.amountPercent) || 0), 0));
  });

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private orderStoreService: OrderStoreService,
    public orgStoreService: OrgStoreService,
    public proyectoStoreService: ProyectoStoreService
  ) {
    const today = new Date().toISOString().split('T')[0];

    this.orderForm = this.fb.group({
      orderType: ['OS', Validators.required],
      orderNumberDigits: ['', [Validators.required, Validators.pattern('^[0-9]{1,5}$')]],
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      providerName: ['Consorcio Ambiental S.A.', Validators.required],
      contractorType: ['JURIDICA', Validators.required],
      contractNumber: [''],
      requestingArea: ['DFA', Validators.required],
      totalAmount: [100000, [Validators.required, Validators.min(1)]],
      notificationDate: [today, Validators.required],
      serviceDescription: ['', Validators.required],
      requiresExtraVb: [false],
      extraVbArea: [''],
      projectId: ['']  // Valor por defecto para pre-llenar entregables
    });

    this.updateFormattedCode();
  }

  /** Propaga el proyecto seleccionado en Paso 1 a todos los entregables del Paso 2 */
  propagateProjectToDeliverables(): void {
    const defaultProjectId = this.orderForm.get('projectId')?.value || '';
    this.generatedDeliverables.update(list =>
      list.map(d => ({ ...d, projectId: defaultProjectId }))
    );
  }

  /** Devuelve el tipo de proyecto dado su id */
  getProyectoTipo(projectId: string): 'PROYECTO' | 'MANTENIMIENTO' | undefined {
    return this.proyectoStoreService.getById(projectId)?.tipo;
  }

  isPrevisionDate(dueDateStr: string): boolean {
    if (!dueDateStr) return false;
    const notifDateStr = this.orderForm?.get('notificationDate')?.value || '';
    const notifYear = notifDateStr ? Number(notifDateStr.split('-')[0]) : this.currentYear;
    const dueYear = Number(dueDateStr.split('-')[0]);
    return !isNaN(dueYear) && !isNaN(notifYear) && dueYear > notifYear;
  }

  getYearFromDate(dateStr: string): string {
    if (!dateStr) return '';
    return dateStr.split('-')[0] || '';
  }

  confirmAndSaveOrder() {
    this.updateFormattedCode();
    if (this.isDuplicateOrder()) {
      alert(`No se puede guardar: La orden ${this.formattedCode()} ya existe registrada en el sistema.`);
      return;
    }

    if (this.totalPercentSum() !== 100) return;

    const formValues = this.orderForm.value;
    const type = formValues.orderType as 'OS' | 'OC';
    const numberCode = this.formattedCode();

    // Si el N° Contrato se deja vacío, toma el código completo de la OS/OC
    const finalContractNumber = formValues.contractNumber?.trim() || numberCode;

    const selectedAreaObj = this.orgStoreService.flatActiveAreas().find(a => a.code === formValues.requestingArea);
    const resolvedAreaLabel = selectedAreaObj ? selectedAreaObj.fullLabel : formValues.requestingArea;

    const notifDateStr = formValues.notificationDate || new Date().toISOString().split('T')[0];
    const notifYear = Number(notifDateStr.split('-')[0]) || this.currentYear;

    const deliverablesData: DeliverableData[] = this.generatedDeliverables().map((del, idx) => {
      let dueDateYear = notifYear;
      if (del.dueDate) {
        const parts = del.dueDate.split('-');
        if (parts.length === 3) {
          dueDateYear = Number(parts[0]);
        }
      }

      // Regla de Previsión: Si la fecha fin cae en un año fiscal posterior (> notifYear), se marca automáticamente como PREVISION
      const isPrevision = dueDateYear > notifYear;
      const status: DeliverableStatus = isPrevision ? 'PREVISION' : 'PENDIENTE';

      return {
        id: `d-${Date.now()}-${idx + 1}`,
        name: del.name,
        startDate: del.startDate,
        daysOffset: del.daysOffset,
        computeMode: this.startDayRule,
        dueDate: del.dueDate,
        amountPercent: del.amountPercent,
        amount: del.calculatedAmount,
        status: status,
        observationCount: 0,
        projectId: del.projectId || undefined
      };
    });

    const createdOrder = this.orderStoreService.addOrder({
      number: numberCode,
      type: type,
      ruc: formValues.ruc,
      provider: formValues.providerName,
      contractorType: formValues.contractorType === 'JURIDICA' ? 'PERSONA JURÍDICA' : 'LOCADOR DE SERVICIOS (NATURAL)',
      contractNumber: finalContractNumber,
      serviceDescription: formValues.serviceDescription,
      requestingArea: resolvedAreaLabel,
      notificationDate: formValues.notificationDate,
      totalAmount: Number(formValues.totalAmount),
      isRecurrent: this.isRecurrent,
      requiresExtraVb: Boolean(formValues.requiresExtraVb),
      computeRule: this.startDayRule,
      deliverables: deliverablesData,
      projectId: formValues.projectId || undefined
    });

    alert(`¡Orden ${createdOrder.number} y sus ${deliverablesData.length} entregables guardados exitosamente en la memoria/cache!`);
    
    if (type === 'OS') {
      this.router.navigate(['/ordenes-servicio']);
    } else {
      this.router.navigate(['/ordenes-compra']);
    }
  }

  goToStep(step: number) {
    if (step === 2) {
      this.updateFormattedCode();
      if (this.isDuplicateOrder()) {
        alert(`No se puede continuar: La orden ${this.formattedCode()} ya se encuentra registrada.`);
        return;
      }
      if (this.orderForm.valid) {
        if (this.generatedDeliverables().length === 0) {
          this.initDefaultFourDeliverables();
        } else {
          this.recalculateDeliverableDates();
          this.recalculateDeliverableAmounts();
        }
        this.currentStep.set(2);
      }
    } else {
      this.currentStep.set(1);
    }
  }

  goToStep2() {
    this.goToStep(2);
  }

  setStartDayRule(rule: 'NEXT_DAY' | 'SAME_DAY') {
    this.startDayRule = rule;
    this.recalculateDeliverableDates();
  }

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.orderForm.get('orderNumberDigits')?.setValue(input.value, { emitEvent: false });
    this.updateFormattedCode();
  }

  updateFormattedCode() {
    const type = this.orderForm?.get('orderType')?.value || 'OS';
    const rawDigits = this.orderForm?.get('orderNumberDigits')?.value || '';
    const padded = rawDigits ? String(rawDigits).padStart(5, '0') : '00000';
    const code = `${type}-${padded}-${this.currentYear}`;
    this.formattedCode.set(code);

    if (rawDigits) {
      const isDup = this.orderStoreService.existsOrderNumber(code);
      this.isDuplicateOrder.set(isDup);
      if (isDup) {
        this.orderForm.get('orderNumberDigits')?.setErrors({ duplicate: true });
      } else {
        const errors = this.orderForm.get('orderNumberDigits')?.errors;
        if (errors && errors['duplicate']) {
          delete errors['duplicate'];
          if (Object.keys(errors).length === 0) {
            this.orderForm.get('orderNumberDigits')?.setErrors(null);
          } else {
            this.orderForm.get('orderNumberDigits')?.setErrors(errors);
          }
        }
      }
    } else {
      this.isDuplicateOrder.set(false);
    }
  }

  onRecurrentToggle() {
    this.recalculateDeliverableDates();
  }

  // Initialize 4 default rows
  initDefaultFourDeliverables() {
    const count = 4;
    const totalAmount = this.orderForm.get('totalAmount')?.value || 0;
    const notifDateStr = this.orderForm.get('notificationDate')?.value || new Date().toISOString().split('T')[0];
    const equalPercent = 25; // 25% each

    const list: GeneratedDeliverable[] = [];

    for (let i = 1; i <= count; i++) {
      const daysOffset = 30; // 30 días calendario por defecto
      let startDateStr = notifDateStr;

      if (i > 1 && list[i - 2]?.dueDate) {
        startDateStr = list[i - 2].dueDate;
      }

      const initialOffset = (this.startDayRule === 'NEXT_DAY') ? daysOffset : (daysOffset - 1);
      const calculatedDueDate = this.addCalendarDays(startDateStr, initialOffset);

      list.push({
        id: i,
        name: `Entregable N° ${i}`,
        startDate: startDateStr,
        daysOffset: daysOffset,
        dueDate: calculatedDueDate,
        amountPercent: equalPercent,
        calculatedAmount: (totalAmount * equalPercent) / 100
      });
    }

    this.generatedDeliverables.set(list);
  }

  // Add row (Max 36 rows)
  addDeliverableRow() {
    const currentList = [...this.generatedDeliverables()];
    if (currentList.length >= 36) return;

    const nextIndex = currentList.length + 1;
    const totalAmount = this.orderForm.get('totalAmount')?.value || 0;
    const notifDateStr = this.orderForm.get('notificationDate')?.value || new Date().toISOString().split('T')[0];
    
    const lastItem = currentList[currentList.length - 1];
    const startDateStr = lastItem ? lastItem.dueDate : notifDateStr;
    const daysOffset = 30;
    const calcOffset = (this.startDayRule === 'NEXT_DAY') ? daysOffset : (daysOffset - 1);
    const dueDateStr = this.addCalendarDays(startDateStr, calcOffset);

    // Auto balance percentages
    const newCount = currentList.length + 1;
    const newEqualPercent = Math.floor(100 / newCount);

    currentList.push({
      id: nextIndex,
      name: `Entregable N° ${nextIndex}`,
      startDate: startDateStr,
      daysOffset: daysOffset,
      dueDate: dueDateStr,
      amountPercent: newEqualPercent,
      calculatedAmount: (totalAmount * newEqualPercent) / 100
    });

    // Rebalance all existing rows
    currentList.forEach((item, idx) => {
      const isLast = idx === currentList.length - 1;
      const pct = isLast ? (100 - newEqualPercent * (newCount - 1)) : newEqualPercent;
      item.amountPercent = pct;
      item.calculatedAmount = (totalAmount * pct) / 100;
    });

    this.generatedDeliverables.set(currentList);
  }

  // Remove row (Min 1 row)
  removeDeliverableRow(index: number) {
    let currentList = [...this.generatedDeliverables()];
    if (currentList.length <= 1) return;

    currentList.splice(index, 1);

    // Re-index names & percentages
    const newCount = currentList.length;
    const newEqualPercent = Math.floor(100 / newCount);
    const totalAmount = this.orderForm.get('totalAmount')?.value || 0;

    currentList.forEach((item, idx) => {
      item.id = idx + 1;
      item.name = `Entregable N° ${idx + 1}`;
      const isLast = idx === newCount - 1;
      const pct = isLast ? (100 - newEqualPercent * (newCount - 1)) : newEqualPercent;
      item.amountPercent = pct;
      item.calculatedAmount = (totalAmount * pct) / 100;
    });

    this.generatedDeliverables.set(currentList);
    this.recalculateDeliverableDates();
  }

  // Recalculate dates using Días Calendario + NEXT_DAY vs SAME_DAY rule
  recalculateDeliverableDates() {
    const notifDateStr = this.orderForm.get('notificationDate')?.value || new Date().toISOString().split('T')[0];
    const currentList = this.generatedDeliverables();
    
    currentList.forEach((del, idx) => {
      let baseDateStr = notifDateStr;

      if (this.isRecurrent) {
        if (!del.startDate) {
          del.startDate = (idx === 0) ? notifDateStr : (currentList[idx - 1]?.dueDate || notifDateStr);
        }
        baseDateStr = del.startDate;
      } else {
        baseDateStr = notifDateStr;
        del.startDate = notifDateStr;
      }

      const effectiveDays = (this.startDayRule === 'NEXT_DAY') 
        ? Number(del.daysOffset || 0) 
        : (Number(del.daysOffset || 0) > 0 ? Number(del.daysOffset) - 1 : 0);

      del.dueDate = this.addCalendarDays(baseDateStr, effectiveDays);
    });

    this.generatedDeliverables.set([...currentList]);
  }

  // Helper method: Add calendar days to YYYY-MM-DD
  private addCalendarDays(dateStr: string, days: number): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;

    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);

    const d = new Date(year, month, day);
    d.setDate(d.getDate() + Number(days || 0));

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  recalculateDeliverableAmounts() {
    const totalAmount = this.orderForm.get('totalAmount')?.value || 0;
    const currentList = this.generatedDeliverables();

    currentList.forEach(del => {
      del.calculatedAmount = (totalAmount * Number(del.amountPercent || 0)) / 100;
    });

    this.generatedDeliverables.set([...currentList]);
  }

  formatDateToDDMMYYYY(dateStr?: string): string {
    if (!dateStr) return '-';
    if (dateStr.includes('/')) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [yyyy, mm, dd] = parts;
      return `${dd.padStart(2, '0')}/${mm.padStart(2, '0')}/${yyyy}`;
    }
    return dateStr;
  }

  goBack() {
    this.router.navigate(['/ordenes-servicio']);
  }
}
