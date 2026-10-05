/**
 * Barrel de componentes compartidos OEFA (Design System Master).
 * Importa desde aquí en cualquier vista:
 *
 * import { 
 *   OefaStatusBadgeComponent, 
 *   OefaButtonComponent, 
 *   OefaIconButtonComponent,
 *   ...
 * } from '../../shared';
 */

// 1. Átomos y Componentes Base
export { OefaButtonComponent } from './components/button/button.component';
export { OefaIconButtonComponent } from './components/icon-button/icon-button.component';
export { OefaIconComponent, OEFA_ICON_SIZES } from './components/icon/icon.component';
export { OefaChipComponent } from './components/chip/chip.component';
export { OefaDotBadgeComponent } from './components/dot-badge/dot-badge.component';
export { OefaStatusBadgeComponent } from './components/status-badge/status-badge.component';
export { OefaSpinnerComponent } from './components/spinner/spinner.component';
export { OefaSkeletonComponent } from './components/skeleton/skeleton.component';
export { OefaInfoTooltipComponent } from './components/info-tooltip/info-tooltip.component';

// 2. Formularios y Entradas
export { OefaFormFieldComponent } from './components/form-field/form-field.component';
export { DatePickerComponent } from './components/date-picker/date-picker.component';
export { OefaDateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
export { OefaFileUploaderComponent } from './components/file-uploader/file-uploader.component';
export { OefaSegmentedSwitchComponent } from './components/segmented-switch/segmented-switch.component';
export { OefaSelectionCardComponent } from './components/selection-card/selection-card.component';

// 3. Feedback y Diálogos
export { OefaAlertComponent } from './components/alert/alert.component';
export { OefaModalComponent } from './components/modal/modal.component';
export { ToastComponent } from './components/toast/toast.component';
export { ToastService } from './components/toast/toast.service';

// 4. Navegación y Shell
export { OefaTabsComponent } from './components/tabs/tabs.component';
export { OefaStepperComponent } from './components/stepper/stepper.component';
export { OefaPageHeaderComponent } from './components/page-header/page-header.component';
export { OefaPageLayoutComponent } from './components/page-layout/page-layout.component';
export { OefaPaginationComponent } from './components/pagination/pagination.component';
export { OefaDrawerComponent } from './components/drawer/drawer.component';
export { OefaDropdownComponent } from './components/dropdown/dropdown.component';
export { OefaAppLauncherComponent } from './components/app-launcher/app-launcher.component';
export { UserMenuComponent } from './components/user-menu/user-menu.component';
export { OefaFilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
export { OefaCollapsibleComponent } from './components/collapsible/collapsible.component';
export { OefaAccordionComponent } from './components/accordion/accordion.component';

// 5. Visualización de Datos y Tarjetas
export { OefaTableComponent, TableComponent } from './components/table/table.component';
export { OefaEmptyStateComponent } from './components/empty-state/empty-state.component';
export { OefaProgressBarComponent } from './components/progress-bar/progress-bar.component';
export { OefaKpiCardComponent } from './components/kpi-card/kpi-card.component';
export { OefaBentoKpiTileComponent } from './components/bento-kpi-tile/bento-kpi-tile.component';
export { OefaCatalogCardComponent } from './components/catalog-card/catalog-card.component';
export { OefaProcessCardComponent } from './components/process-card/process-card.component';
export { OefaCardComponent } from './components/card/card.component';
export { OefaStatComponent } from './components/stat/stat.component';
export { OefaDescriptionListComponent, OefaDescriptionItemComponent } from './components/description-list';
export type { DescriptionListColumns, DescriptionListDensity, DescriptionListLayout } from './components/description-list';
export type { OefaStatSize, OefaStatLayout } from './components/stat/stat.component';

// Utils
export { getStatusBadgeClass, getStatusLabel } from './utils/status.utils';
export type { StatusBadgeClass, UniversalBadgeVariant } from './utils/status.utils';

// Types & Interfaces
export type { ButtonVariant, ButtonSize, ButtonType, ButtonIconPosition } from './components/button/button.component';
export type { IconButtonVariant, IconButtonSize } from './components/icon-button/icon-button.component';
export type { OefaIconSize } from './components/icon/icon.component';
export type { ChipVariant } from './components/chip/chip.component';
export type { OefaDotBadgeColor, OefaDotBadgeSize } from './components/dot-badge/dot-badge.component';
export type { SkeletonVariant } from './components/skeleton/skeleton.component';
export type { AlertType } from './components/alert/alert.component';
export type { ModalVariant, ModalSize } from './components/modal/modal.component';
export type { ToastItem, ToastType } from './components/toast/toast.service';
export type { OefaTabItem } from './components/tabs/tabs.component';
export type { OefaStepItem, StepperOrientation } from './components/stepper/stepper.component';
export type { BreadcrumbItem } from './components/page-header/page-header.component';
export type { DrawerPosition, DrawerSize } from './components/drawer/drawer.component';
export type { DropdownAlign } from './components/dropdown/dropdown.component';
export type { OefaAppItem } from './components/app-launcher/app-launcher.models';
export type { UserMenuProfile } from './components/user-menu/user-menu.component';
export type { FilterOption, FilterGroupItem, FilterStatusOption } from './components/filter-sidebar/filter-sidebar.component';
export type { CollapsibleVariant, CollapsibleBadgeVariant } from './components/collapsible/collapsible.component';
export type { TableColumn, SortDirection, TableDensity } from './components/table/table.component';
export type { ProgressBarVariant, ProgressBarSize } from './components/progress-bar/progress-bar.component';
export type { KpiFootType } from './components/kpi-card/kpi-card.component';
export type { CatalogActivityType, CatalogChipConfig } from './components/catalog-card/catalog-card.component';
export type { ProcessCardVariant } from './components/process-card/process-card.component';
export type { SelectionCardType, SelectionCardBadgeVariant } from './components/selection-card/selection-card.component';
export type { SegmentedOption } from './components/segmented-switch/segmented-switch.component';
export type { OefaDateRange, CalendarDay as DateRangeCalendarDay } from './components/date-range-picker/date-range-picker.models';
export type { UploadedFileItem } from './components/file-uploader/file-uploader.models';
