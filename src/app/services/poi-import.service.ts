import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PoiImportResult {
  itemInsert: number;
  itemUpdate: number;
  itemSkip: number;
  itemBloqueo: number;
  itemInactivo: number;
  rqInsert: number;
  rqUpdate: number;
  rqSkip: number;
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class PoiImportService {
  private http = inject(HttpClient);

  importarExcel(file: File): Observable<PoiImportResult> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<PoiImportResult>('/api/poi/importar', formData);
  }
}
