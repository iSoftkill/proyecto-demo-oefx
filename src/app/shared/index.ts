/**
 * Barrel de componentes compartidos OEFA.
 * Importa desde aquí en cualquier vista:
 *
 * import { 
 *   OefaStatusBadgeComponent, 
 *   OefaButtonComponent, 
 *   OefaIconButtonComponent,
 *   OefaDrawerComponent, 
 *   OefaDropdownComponent,
 *   OefaFormFieldComponent,
 *   OefaPaginationComponent,
 *   OefaSegmentedSwitchComponent
 * } from '../../shared';
 */

// Components
export { OefaStatusBadgeComponent } from './components/status-badge/status-badge.component';
export { OefaButtonComponent } from './components/button/button.component';
export { OefaIconButtonComponent } from './components/icon-button/icon-button.component';
export { OefaDrawerComponent } from './components/drawer/drawer.component';
export { OefaDropdownComponent } from './components/dropdown/dropdown.component';
export { OefaFormFieldComponent } from './components/form-field/form-field.component';
export { OefaPaginationComponent } from './components/pagination/pagination.component';
export { OefaSegmentedSwitchComponent } from './components/segmented-switch/segmented-switch.component';
export { OefaEmptyStateComponent } from './components/empty-state/empty-state.component';
export { OefaSpinnerComponent } from './components/spinner/spinner.component';
export { OefaModalComponent } from './components/modal/modal.component';
export { OefaPageHeaderComponent } from './components/page-header/page-header.component';
export { OefaTabsComponent } from './components/tabs/tabs.component';
export { OefaStepperComponent } from './components/stepper/stepper.component';
export { OefaSkeletonComponent } from './components/skeleton/skeleton.component';
export { OefaChipComponent } from './components/chip/chip.component';

// Utils & Types
export { getStatusBadgeClass, getStatusLabel } from './utils/status.utils';
export type { StatusBadgeClass, UniversalBadgeVariant } from './utils/status.utils';
export type { ButtonVariant, ButtonSize, ButtonType } from './components/button/button.component';
export type { IconButtonVariant } from './components/icon-button/icon-button.component';
export type { DrawerPosition, DrawerSize } from './components/drawer/drawer.component';
export type { DropdownAlign } from './components/dropdown/dropdown.component';
export type { SegmentedOption } from './components/segmented-switch/segmented-switch.component';
export type { BreadcrumbItem } from './components/page-header/page-header.component';
export type { OefaTabItem } from './components/tabs/tabs.component';
export type { OefaStepItem, StepperOrientation } from './components/stepper/stepper.component';
export type { SkeletonVariant } from './components/skeleton/skeleton.component';
export type { ChipVariant } from './components/chip/chip.component';
