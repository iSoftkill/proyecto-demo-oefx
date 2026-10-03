export interface FilterOption {
  label: string;
  count: number;
  checked: boolean;
}

export interface FilterGroupItem {
  label: string;
  open: boolean;
  options: FilterOption[];
}

export interface FilterStatusOption {
  value: string;
  label: string;
}
