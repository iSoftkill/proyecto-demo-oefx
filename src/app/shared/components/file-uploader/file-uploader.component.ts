import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadedFileItem } from './file-uploader.models';

export type { UploadedFileItem } from './file-uploader.models';

@Component({
  selector: 'oefa-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
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
