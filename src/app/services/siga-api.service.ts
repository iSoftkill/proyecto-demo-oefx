import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SigaRequest, SigaDocumento, SigedExpedienteResponse } from '../models/siga.model';

@Injectable({ providedIn: 'root' })
export class SigaService {
    private http = inject(HttpClient);

    // ── Legacy SIGA ──────────────────────────────────────────────────────────
    private readonly legacyUrl = '/OEFA.ServicesAPI/api/siga/expedientebuscar';
    buscarExpediente(body: SigaRequest): Observable<SigaDocumento[]> {
        return this.http.post<SigaDocumento[]>(this.legacyUrl, body);
    }

    // ── SIGED (Mesa de Partes Virtual) ────────────────────────────────────────
    // Endpoint real (pendiente de implementación por OTI):
    //   GET /api/siged/expediente/{numero}
    // Mientras no exista, el proxy redirige /api/siged/* al mock (json-server).
    private readonly sigedBaseUrl = '/api/siged';

    buscarExpedienteSiged(numero: string): Observable<SigedExpedienteResponse> {
        const encodedNumero = encodeURIComponent(numero);
        return this.http.get<SigedExpedienteResponse>(
            `${this.sigedBaseUrl}/expediente/${encodedNumero}`
        );
    }
}