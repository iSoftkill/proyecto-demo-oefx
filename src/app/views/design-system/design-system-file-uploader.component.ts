import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaFileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-design-system-file-uploader',
  standalone: true,
  imports: [CommonModule, OefaFileUploaderComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📂 Cargador de Archivos y Dropzone (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-file-uploader&gt; accesible con Drag &amp; Drop, validación en línea y anuncios WCAG 2.2.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Dropzone de Archivos PDF (Hasta 10 MB)</h3>
          <span class="text-muted">Filtro de extensiones configurable, validación de tamaño, feedback drag-active y lista de documentos eliminables.</span>
        </div>
        <div class="card-body">
          <oefa-file-uploader
            label="Documentos de sustento o anexos"
            hint="Solo archivos .pdf de hasta 10 MB por documento"
            accept=".pdf"
            [maxSizeMb]="10"
            [multiple]="true"
            (filesChange)="onFilesChanged($event)"
            (fileError)="onFileError($event)"
          ></oefa-file-uploader>

          <div class="status-box">
            <span>Archivos cargados en memoria: <strong>{{ uploadedCount }} archivo(s)</strong></span>
            @if (lastError) {
              <span class="error-pill">{{ lastError }}</span>
            }
          </div>
        </div>
      </div>

      <!-- 2. Código de Implementación -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Código de Implementación</h3>
          <span class="text-muted">Componente standalone disponible desde <code>shared/components/file-uploader</code> con validación automática y accesibilidad WAI-ARIA.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;oefa-file-uploader
  label="Documentos de sustento o anexos"
  hint="Solo archivos .pdf de hasta 10 MB por documento"
  accept=".pdf"
  [maxSizeMb]="10"
  [multiple]="true"
  (filesChange)="onFilesChanged($event)"
  (fileError)="onFileError($event)"
/&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); border-radius: calc(var(--oefa-radius-lg) - 1px) calc(var(--oefa-radius-lg) - 1px) 0 0; display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

    .status-box { margin-top: 16px; font-size: 0.875rem; color: var(--oefa-text-secondary); background: var(--oefa-surface-subtle); border: 1px solid var(--oefa-border-color); padding: 12px 16px; border-radius: var(--oefa-radius-md); display: flex; align-items: center; justify-content: space-between; }
    .error-pill { background: var(--oefa-error-container); color: var(--oefa-error-on-container); border: 1px solid var(--oefa-error-container-hc, var(--oefa-error-root)); padding: 4px 10px; border-radius: var(--oefa-radius-full); font-size: 0.75rem; font-weight: 600; }

    .code-block {
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 16px;
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      margin: 0;
      overflow-x: auto;
      font-family: var(--oefa-font-mono);
      line-height: 1.5;
    }
  `]
})
export class DesignSystemFileUploaderComponent {
  uploadedCount = 0;
  lastError = '';

  onFilesChanged(files: File[]): void {
    this.uploadedCount = files.length;
    this.lastError = '';
  }

  onFileError(error: string): void {
    this.lastError = error;
  }
}
