import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OefaCollapsibleComponent } from '../collapsible/collapsible.component';

/**
 * Componente Contenedor Acordeón Institucional del OEFA.
 * Agrupa y sincroniza múltiples paneles plegables (<oefa-collapsible>).
 * Permite modo exclusivo (solo un panel abierto a la vez) o expansión múltiple.
 *
 * @example
 * <oefa-accordion [multiple]="false">
 *   <oefa-collapsible title="Datos del Administrado" [isOpen]="true">...</oefa-collapsible>
 *   <oefa-collapsible title="Documentos Adjuntos">...</oefa-collapsible>
 * </oefa-accordion>
 */
@Component({
  selector: 'oefa-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class OefaAccordionComponent implements AfterContentInit, OnDestroy {
  @Input() multiple: boolean = false;
  @Input() gap: 'sm' | 'md' | 'lg' | 'none' = 'sm';

  @ContentChildren(OefaCollapsibleComponent)
  collapsibles!: QueryList<OefaCollapsibleComponent>;

  private subs: Subscription[] = [];

  ngAfterContentInit(): void {
    this.setupCollapsibles();
    this.collapsibles.changes.subscribe(() => {
      this.setupCollapsibles();
    });
  }

  private setupCollapsibles(): void {
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];

    this.collapsibles.forEach(item => {
      const sub = item.isOpenChange.subscribe((isOpen: boolean) => {
        if (isOpen && !this.multiple) {
          this.collapseOthers(item);
        }
      });
      this.subs.push(sub);
    });
  }

  private collapseOthers(activeItem: OefaCollapsibleComponent): void {
    this.collapsibles.forEach(item => {
      if (item !== activeItem && item.isOpen) {
        item.isOpen = false;
        item.isOpenChange.emit(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
