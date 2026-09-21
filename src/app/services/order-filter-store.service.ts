import { Injectable, signal } from '@angular/core';

export interface OrderListFilterState {
  viewMode: 'orders' | 'deliverables';
  searchQuery: string;
  selectedArea: string;
  selectedStatus: string;
  selectedYear: string;
  showAdvancedFilters: boolean;
  dateField: 'NOTIFICATION' | 'START' | 'DUE';
  dateFrom: string;
  dateTo: string;
  contractorType: string;
  amountMin: number | null;
  amountMax: number | null;
  selectedProyecto: string;
  scrollY: number;
}

const DEFAULT_STATE: OrderListFilterState = {
  viewMode: 'orders',
  searchQuery: '',
  selectedArea: '',
  selectedStatus: '',
  selectedYear: '2026',
  showAdvancedFilters: false,
  dateField: 'NOTIFICATION',
  dateFrom: '',
  dateTo: '',
  contractorType: '',
  amountMin: null,
  amountMax: null,
  selectedProyecto: '',
  scrollY: 0
};

@Injectable({
  providedIn: 'root'
})
export class OrderFilterStoreService {
  private osState = signal<OrderListFilterState>({ ...DEFAULT_STATE });
  private ocState = signal<OrderListFilterState>({ ...DEFAULT_STATE });

  getState(type: 'OS' | 'OC'): OrderListFilterState {
    return type === 'OS' ? this.osState() : this.ocState();
  }

  saveState(type: 'OS' | 'OC', state: OrderListFilterState): void {
    if (type === 'OS') {
      this.osState.set(state);
    } else {
      this.ocState.set(state);
    }
  }

  clearState(type: 'OS' | 'OC'): void {
    if (type === 'OS') {
      this.osState.set({ ...DEFAULT_STATE, selectedYear: '' });
    } else {
      this.ocState.set({ ...DEFAULT_STATE, selectedYear: '' });
    }
  }
}
