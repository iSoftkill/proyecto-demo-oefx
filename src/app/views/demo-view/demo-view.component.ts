import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SigaService } from '../../services/siga-api.service';
import { SigaRequest, SigaDocumento } from '../../models/siga.model';
// importando componentes reutilizables del sistema de diseño
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaAlertComponent } from '../../shared/components/alert/alert.component';
import { OefaEmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-demo-view',
  standalone: true,
  imports: [CommonModule, FormsModule, OefaPageHeaderComponent, OefaButtonComponent, OefaAlertComponent, OefaEmptyStateComponent],
  templateUrl: './demo-view.component.html',
  styleUrl: './demo-view.component.css'
})
export class DemoViewComponent implements OnInit {
  optionName = signal<string>('Buscador SIGA');
  private route = inject(ActivatedRoute);
  private sigaService = inject(SigaService);
  // Filtro como objeto plano para ngModel
  filtro: SigaRequest = {
    unidadejecutora: '001',
    anioproceso: '2025',
    tipodocumento: 'S',
    numero: '00996'
  };
  documentos = signal<SigaDocumento[]>([]);
  cargando = signal<boolean>(false);
  errorMsg = signal<string | null>(null);
  busquedaRealizada = signal<boolean>(false);
  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) {
        this.optionName.set(data['title']);
      }
    });
  }
  // Aquí crearemos la lógica de la llamada en el Paso 4
  ejecutarBusqueda() {
    // 1. Iniciamos el estado de carga y limpiamos estados previos
    this.cargando.set(true);
    this.errorMsg.set(null);
    this.documentos.set([]);
    this.busquedaRealizada.set(false);
    // 2. Ejecutamos la petición HTTP a través de nuestro SigaService
    console.log(this.filtro);
    this.sigaService.buscarExpediente(this.filtro).subscribe({
      next: (response: any) => {
        // 👈 Extraemos el array desde la propiedad 'result'
        const listado = response && Array.isArray(response.result) ? response.result : [];
        this.documentos.set(listado);
        this.cargando.set(false);
        this.busquedaRealizada.set(true);
      },
      error: (err) => {
        console.error('Error al consultar el expediente SIGA:', err);
        this.errorMsg.set('No se pudo recuperar la información de SIGA. Verifique la conexión o el formato de los datos.');
        this.cargando.set(false);
        this.busquedaRealizada.set(true);
      }
    });
  }
}