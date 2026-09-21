// ─── Modelos legacy SIGA (mantener por compatibilidad) ───────────────────────
export interface SigaRequest {
    unidadejecutora: string;
    anioproceso: string;
    tipodocumento: string;
    numero: string;
}

export interface SigaDocumento {
    DESCRIP_DOC: string;
    DOC_ASOC: string;
    FEC_FILE: string;
    ASUNTO: string;
    TIPO_ARCHIVO: string;
    NOM_ARCHIVO: string;
    NOMBRE_DESCARGA: string;
    FILEUBICACION: string;
}

// ─── Modelos SIGED (Mesa de Partes Virtual) ────────────────────────────────────

export interface SigedArchivo {
    idArchivo: number;
    nombre: string;
    esPrincipal: number;       // 1 = principal, 0 = complementario
    uuid: string;
    estado: string;
    extension: string | null;
    tamano: number | null;
    esFirmado: number;
    fechaFirma: string | null;
}

export interface SigedDocumentoItem {
    idDocumento: number;
    asunto: string;
    folios: number;
    esPrincipal: number;       // 1 = principal, 0 = complementario
    idTipoAmbito: number;
    idTipoDocumento: number;
    tipoDocumento: string;
    numero: string;
    fechaCreacion: string;     // formato 'YYYY-MM-DD'
    archivos: SigedArchivo[];
    // Campo local: seleccionado por el operador via radio button
    esSeleccionado?: boolean;
}

export interface SigedCliente {
    idCliente: number;
    apellidoMaterno: string;
    apellidoPaterno: string;
    nombre: string;
    tipoDocumento: string;
    numeroIdentificacion: string;
    telefono: string;
    correo: string;
    direccion: unknown[];
}

export interface SigedExpedienteResponse {
    estado: string;
    mensaje: string;
    idExpediente: number;
    numero: string;
    titulo: string;
    fechaCreacionExpediente: number;   // timestamp Unix en ms
    estadoTramite: string;
    origen: string;
    administrado: string;
    idCliente: number;
    cliente: SigedCliente;
    documentos: SigedDocumentoItem[];
}

/** Estado del formulario de búsqueda SIGED (usado en el modal) */
export interface SigedBusquedaState {
    numeroExpediente: string;
    loading: boolean;
    error: string | null;
    resultado: SigedExpedienteResponse | null;
    /** ID del documento seleccionado por el operador (radio button) */
    documentoSeleccionadoId: number | null;
}