import { ChipVariant } from '../chip/chip.component';

export type BentoChartType = 'donut' | 'gauge' | 'bars' | 'sparkline' | 'none';

export interface BentoChipConfig {
  variant: ChipVariant;
  label: string;
}
