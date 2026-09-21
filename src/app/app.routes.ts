import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { OrderListComponent } from './views/order-list/order-list.component';
import { OrderDetailComponent } from './views/order-detail/order-detail.component';
import { NewOrderFormComponent } from './views/new-order-form/new-order-form.component';
import { SettingsComponent } from './views/settings/settings.component';
import { DemoViewComponent } from './views/demo-view/demo-view.component';
import { LoginComponent } from './views/login/login.component';
import { DesignSystemColorsComponent } from './views/design-system/design-system-colors.component';
import { DesignSystemTypographyComponent } from './views/design-system/design-system-typography.component';
import { DesignSystemButtonsComponent } from './views/design-system/design-system-buttons.component';
import { DesignSystemInputsComponent } from './views/design-system/design-system-inputs.component';
import { DesignSystemBadgesComponent } from './views/design-system/design-system-badges.component';
import { DesignSystemIconsComponent } from './views/design-system/design-system-icons.component';
import { DesignSystemTabsComponent } from './views/design-system/design-system-tabs.component';
import { DesignSystemStepsComponent } from './views/design-system/design-system-steps.component';
import { DesignSystemTablesComponent } from './views/design-system/design-system-tables.component';
import { DesignSystemResponsiveComponent } from './views/design-system/design-system-responsive.component';
import { DesignSystemNavigationComponent } from './views/design-system/design-system-navigation.component';
import { DesignSystemFeedbackComponent } from './views/design-system/design-system-feedback.component';
import { DesignSystemSegmentedSwitchComponent } from './views/design-system/design-system-segmented-switch.component';
import { DesignSystemPaginationComponent } from './views/design-system/design-system-pagination.component';
import { DesignSystemDropdownsComponent } from './views/design-system/design-system-dropdowns.component';
import { DesignSystemEmptyStatesComponent } from './views/design-system/design-system-empty-states.component';
import { DesignSystemModalsComponent } from './views/design-system/design-system-modals.component';
import { DesignSystemDrawersComponent } from './views/design-system/design-system-drawers.component';
import { DesignSystemPageHeaderComponent } from './views/design-system/design-system-page-header.component';
import { SaipFormComponent } from './views/saip-form/saip-form.component';
import { DesignSystemAlertsComponent } from './views/design-system/design-system-alerts.component';
import { DesignSystemToastsComponent } from './views/design-system/design-system-toasts.component';
import { DesignSystemSelectionCardComponent } from './views/design-system/design-system-selection-card.component';
import { DesignSystemDatePickerComponent } from './views/design-system/design-system-date-picker.component';
import { DesignSystemFileUploaderComponent } from './views/design-system/design-system-file-uploader.component';
import { DesignSystemMotionComponent } from './views/design-system/design-system-motion.component';
import { DesignSystemBentoKpiComponent } from './views/design-system/design-system-bento-kpi.component';
import { DesignSystemCatalogCardComponent } from './views/design-system/design-system-catalog-card.component';
import { DesignSystemFilterSidebarComponent } from './views/design-system/design-system-filter-sidebar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'ordenes-servicio', component: OrderListComponent },
  { path: 'ordenes-compra', component: OrderListComponent },
  { path: 'ordenes/:id', component: OrderDetailComponent },
  { path: 'nueva-orden', component: NewOrderFormComponent },
  { path: 'reportes', component: DashboardComponent },
  { path: 'configuracion', component: SettingsComponent },
  { path: 'saip/solicitud', component: SaipFormComponent },
  
  // Módulo Sistema de Diseño OEFA — Estructura Atomic Design
  { path: 'design-system', redirectTo: 'design-system/colores', pathMatch: 'full' },
  // 1. Átomos
  { path: 'design-system/colores', component: DesignSystemColorsComponent },
  { path: 'design-system/tipografia', component: DesignSystemTypographyComponent },
  { path: 'design-system/motion', component: DesignSystemMotionComponent },
  { path: 'design-system/iconos', component: DesignSystemIconsComponent },
  { path: 'design-system/botones', component: DesignSystemButtonsComponent },
  { path: 'design-system/badges', component: DesignSystemBadgesComponent },
  { path: 'design-system/feedback', component: DesignSystemFeedbackComponent },
  { path: 'design-system/inputs', component: DesignSystemInputsComponent },
  // 2. Moléculas
  { path: 'design-system/bento-kpi', component: DesignSystemBentoKpiComponent },
  { path: 'design-system/catalog-cards', component: DesignSystemCatalogCardComponent },
  { path: 'design-system/alertas', component: DesignSystemAlertsComponent },
  { path: 'design-system/toasts', component: DesignSystemToastsComponent },
  { path: 'design-system/selection-cards', component: DesignSystemSelectionCardComponent },
  { path: 'design-system/date-picker', component: DesignSystemDatePickerComponent },
  { path: 'design-system/file-uploader', component: DesignSystemFileUploaderComponent },
  { path: 'design-system/segmented-switch', component: DesignSystemSegmentedSwitchComponent },
  { path: 'design-system/paginacion', component: DesignSystemPaginationComponent },
  { path: 'design-system/dropdowns', component: DesignSystemDropdownsComponent },
  { path: 'design-system/empty-states', component: DesignSystemEmptyStatesComponent },
  { path: 'design-system/tabs', component: DesignSystemTabsComponent },
  { path: 'design-system/steps', component: DesignSystemStepsComponent },
  // 3. Organismos
  { path: 'design-system/filter-sidebar', component: DesignSystemFilterSidebarComponent },
  { path: 'design-system/modales', component: DesignSystemModalsComponent },
  { path: 'design-system/drawers', component: DesignSystemDrawersComponent },
  { path: 'design-system/page-header', component: DesignSystemPageHeaderComponent },
  { path: 'design-system/tablas', component: DesignSystemTablesComponent },
  // 4. Plantillas y Layout
  { path: 'design-system/navegacion', component: DesignSystemNavigationComponent },
  { path: 'design-system/responsividad', component: DesignSystemResponsiveComponent },

  // Rutas de ejemplo jerárquico (3 niveles)
  { path: 'demo/ejemplo-jerarquico', component: DemoViewComponent, data: { title: 'Ejemplo Jerárquico' } },
  { path: 'demo/modulo-ejemplo-a', component: DemoViewComponent, data: { title: 'Módulo Ejemplo A' } },
  { path: 'demo/subopcion-a1', component: DemoViewComponent, data: { title: 'Subopción A.1' } },
  { path: 'demo/subopcion-a2', component: DemoViewComponent, data: { title: 'Subopción A.2' } },
  { path: 'demo/modulo-ejemplo-b', component: DemoViewComponent, data: { title: 'Módulo Ejemplo B' } },

  { path: 'sandbox', loadComponent: () => import('./views/sandbox/sandbox-view.component').then(m => m.SandboxViewComponent) },
  { path: '**', redirectTo: 'dashboard' }
];
