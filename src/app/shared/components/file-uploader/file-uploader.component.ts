import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UploadedFileItem {
  file: File;
  name: string;
  sizeFormatted: string;
}

@Component({
  selector: 'oefa-file-uploader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="uploader-container">
      @if (label) {
        <label class="uploader-label" [id]="uploaderId + '-label'">
          {{ label }}
          @if (required) {
            <span class="required-indicator" aria-hidden="true">*</span>
          }
        </label>
      }

      <!-- Dropzone interactiva -->
      <div
        class="oefa-file-dropzone"
        [class.drag-active]="isDragActive"
        [class.has-error]="!!errorMessage"
        [class.disabled]="disabled"
        [attr.aria-labelledby]="uploaderId + '-label'"
        [attr.aria-describedby]="uploaderId + '-hint ' + uploaderId + '-error'"
        tabindex="0"
        role="button"
        (click)="triggerFileInput()"
        (keydown)="onDropzoneKeyDown($event)"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        <!-- Icono de nube/documento -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="upload-icon"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>

        <div class="dropzone-text">
          <p class="main-prompt">
            <span class="highlight">Haz clic para explorar</span> o arrastra tus archivos aquí
          </p>
          @if (hint) {
            <p class="hint-text" [id]="uploaderId + '-hint'">{{ hint }}</p>
          }
        </div>

        <!-- Input nativo oculto accesible -->
        <input
          #fileInput
          type="file"
          class="sr-only"
          [accept]="accept"
          [multiple]="multiple"
          [disabled]="disabled"
          (change)="onFileSelected($event)"
          tabindex="-1"
          aria-hidden="true"
        />
      </div>

      <!-- Anuncio de accesibilidad para lectores de pantalla -->
      <div class="sr-only" aria-live="polite" role="status">
        {{ liveStatusMessage }}
      </div>

      <!-- Mensaje de error reactivo -->
      @if (errorMessage) {
        <div class="uploader-error" role="alert" [id]="uploaderId + '-error'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      }

      <!-- Lista de archivos seleccionados -->
      @if (fileItems.length > 0) {
        <div class="files-list" role="list" aria-label="Archivos adjuntados">
          @for (item of fileItems; track item.name; let i = $index) {
            <div class="file-item-card" role="listitem">
              <div class="file-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="file-icon" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <div class="file-details">
                  <span class="file-name" [title]="item.name">{{ item.name }}</span>
                  <span class="file-size">{{ item.sizeFormatted }}</span>
                </div>
              </div>

              @if (!disabled) {
                <button
                  type="button"
                  class="file-remove-btn"
                  [attr.aria-label]="'Eliminar archivo ' + item.name"
                  (click)="removeFile(i)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .uploader-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }

    .uploader-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--oefa-text-secondary, #475569);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .required-indicator {
      color: var(--oefa-error-root, #e51a2f);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    .upload-icon {
      color: var(--oefa-primary-root, #144aa7);
      margin-bottom: 8px;
      transition: transform var(--oefa-duration-medium, 300ms) var(--oefa-ease-emphasized, ease);
    }

    .oefa-file-dropzone:hover:not(.disabled) .upload-icon,
    .drag-active .upload-icon {
      transform: translateY(-4px) rotate(-6deg) scale(1.10);
    }

    .dropzone-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .main-prompt {
      margin: 0;
      font-size: 0.875rem;
      color: var(--oefa-text-primary, #0f172a);
      font-weight: 500;

      .highlight {
        color: var(--oefa-primary-root, #144aa7);
        font-weight: 600;
        text-decoration: underline;
      }
    }

    .hint-text {
      margin: 0;
      font-size: 0.75rem;
      color: var(--oefa-text-muted, #94a3b8);
    }

    .uploader-error {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--oefa-error-root, #e51a2f);
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 2px;
    }

    /* Lista de archivos */
    .files-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 8px;
    }

    .file-item-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 14px;
      background-color: var(--oefa-surface-card, #ffffff);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-md, 8px);
      box-sizing: border-box;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: var(--oefa-border-color-strong, #cbd5e1);
      }
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .file-icon {
      color: var(--oefa-primary-root, #144aa7);
      flex-shrink: 0;
    }

    .file-details {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .file-name {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--oefa-text-primary, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 320px;
    }

    .file-size {
      font-size: 0.6875rem;
      color: var(--oefa-text-muted, #94a3b8);
    }

    .file-remove-btn {
      background: transparent;
      border: none;
      color: var(--oefa-text-muted, #94a3b8);
      cursor: pointer;
      padding: 6px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      min-height: 32px;
      transition: all 0.2s ease;

      &:hover {
        color: var(--oefa-error-root, #e51a2f);
        background-color: var(--oefa-error-container, #ffeff1);
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring, #144aa7);
      }
    }
  `]
})
export class OefaFileUploaderComponent {
  @Input() label = 'Documentos de sustento';
  @Input() hint = 'Solo archivos PDF de hasta 10 MB';
  @Input() accept = '.pdf';
  @Input() maxSizeMb = 10;
  @Input() multiple = true;
  @Input() required = false;
  @Input() disabled = false;
  @Input() uploaderId = 'oefa-uploader-' + Math.random().toString(36).substring(2, 9);

  @Input() set files(fileList: File[]) {
    if (fileList) {
      this.currentFiles = [...fileList];
      this.buildFileItems();
    }
  }

  @Output() filesChange = new EventEmitter<File[]>();
  @Output() fileError = new EventEmitter<string>();

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  currentFiles: File[] = [];
  fileItems: UploadedFileItem[] = [];
  isDragActive = false;
  errorMessage = '';
  liveStatusMessage = '';

  triggerFileInput(): void {
    if (this.disabled) return;
    this.errorMessage = '';
    this.fileInputRef?.nativeElement.click();
  }

  onDropzoneKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.triggerFileInput();
    }
  }

  onDragOver(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;
  }

  onDrop(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;

    if (event.dataTransfer?.files) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
      input.value = ''; // Reset para permitir volver a subir el mismo archivo si fue eliminado
    }
  }

  private processFiles(incomingFiles: File[]): void {
    this.errorMessage = '';
    const validFiles: File[] = [];
    const maxBytes = this.maxSizeMb * 1024 * 1024;
    const allowedExtensions = this.accept
      .split(',')
      .map(ext => ext.trim().toLowerCase());

    for (const file of incomingFiles) {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isExtensionAllowed = allowedExtensions.some(
        ext => ext === extension || ext === file.type.toLowerCase() || ext === '*/*'
      );

      if (!isExtensionAllowed) {
        this.setError(`El archivo "${file.name}" no tiene un formato permitido (${this.accept}).`);
        return;
      }

      if (file.size > maxBytes) {
        this.setError(`El archivo "${file.name}" supera el tamaño máximo permitido de ${this.maxSizeMb} MB.`);
        return;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      if (this.multiple) {
        this.currentFiles = [...this.currentFiles, ...validFiles];
      } else {
        this.currentFiles = [validFiles[0]];
      }

      this.buildFileItems();
      this.filesChange.emit(this.currentFiles);
      this.liveStatusMessage = `${validFiles.length} archivo(s) agregado(s) correctamente.`;
    }
  }

  removeFile(index: number): void {
    if (this.disabled) return;
    const removed = this.currentFiles[index];
    this.currentFiles.splice(index, 1);
    this.buildFileItems();
    this.filesChange.emit(this.currentFiles);
    this.liveStatusMessage = `Archivo ${removed?.name || ''} eliminado.`;
  }

  private setError(msg: string): void {
    this.errorMessage = msg;
    this.fileError.emit(msg);
    this.liveStatusMessage = `Error de validación: ${msg}`;
  }

  private buildFileItems(): void {
    this.fileItems = this.currentFiles.map(file => ({
      file,
      name: file.name,
      sizeFormatted: this.formatBytes(file.size)
    }));
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
