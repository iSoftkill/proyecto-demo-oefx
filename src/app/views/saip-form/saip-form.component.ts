import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaStepperComponent, OefaStepItem } from '../../shared/components/stepper/stepper.component';
import { OefaFormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaSelectionCardComponent } from '../../shared/components/selection-card/selection-card.component';
import { OefaFileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';
import { OefaAlertComponent } from '../../shared/components/alert/alert.component';
import { OefaCollapsibleComponent } from '../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-saip-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OefaStepperComponent,
    OefaFormFieldComponent,
    OefaButtonComponent,
    OefaSelectionCardComponent,
    OefaFileUploaderComponent,
    OefaAlertComponent,
    OefaCollapsibleComponent
  ],
  template: `
    <div class="saip-view-container">
      <!-- Encabezado Institucional del Trámite -->
      <header class="saip-header-card">
        <div class="header-main-info">
          <div class="badge-row">
            <span class="oefa-badge-primary">TRÁMITE CIUDADANO</span>
            <span class="legal-badge">Ley N° 27806 • D.S. N° 164-2020-PCM</span>
          </div>
          <h1 class="saip-title">Solicitud de Acceso a la Información Pública (SAIP)</h1>
          <p class="saip-subtitle">
            Toda persona tiene derecho a solicitar y recibir información completa, veraz y oportuna de cualquier entidad del Estado.
          </p>
        </div>

        <div class="header-actions">
          <a
            href="javascript:void(0)"
            class="manual-link-btn"
            aria-label="Descargar o consultar Manual de Usuario SAIP"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span>Manual de Usuario</span>
          </a>
        </div>
      </header>

      <!-- Banner Informativo de Cómputo de Plazos con oefa-alert -->
      <oefa-alert
        type="info"
        title="Horario de recepción y cómputo de plazos:"
        message="Las solicitudes registradas de 00:00 a 23:59 hrs se consideran recibidas el mismo día hábil. Sábados, domingos o feriados se computan a partir del primer día hábil siguiente. Plazo legal de atención: 10 días hábiles."
      ></oefa-alert>

      <!-- Contenedor Principal del Formulario con Stepper -->
      <div class="saip-card-shell">
        <!-- Barra de Progreso Accesible (Stepper) -->
        <div class="stepper-section">
          <oefa-stepper
            [steps]="steps"
            [currentStep]="currentStep"
            [clickable]="true"
            (stepChange)="goToStep($event)"
          ></oefa-stepper>
        </div>

        <div class="stepper-content-body">
          <!-- ========================================================
               PASO 1: DATOS DEL / LA SOLICITANTE
               ======================================================== -->
          @if (currentStep === 1) {
            <section aria-labelledby="step1-title">
              <div class="step-header">
                <h2 id="step1-title" class="step-title">1. Datos del / la Solicitante</h2>
                <p class="step-description">Consigne los datos de identidad y domicilio según su documento oficial.</p>
              </div>

              <div class="form-grid-2">
                <oefa-form-field label="Tipo de Documento" [required]="true">
                  <select class="form-select" [(ngModel)]="formData.tipoDoc" name="tipoDoc">
                    <option value="DNI">Documento Nacional de Identidad (DNI)</option>
                    <option value="CE">Carné de Extranjería (CE)</option>
                    <option value="RUC">Registro Único de Contribuyentes (RUC)</option>
                    <option value="PASAPORTE">Pasaporte</option>
                  </select>
                </oefa-form-field>

                <oefa-form-field label="Número de Documento" [required]="true" help="DNI: 8 dígitos | RUC: 11 dígitos">
                  <div class="doc-search-wrapper">
                    <input
                      type="text"
                      class="form-input font-mono"
                      [(ngModel)]="formData.nroDoc"
                      placeholder="Ej: 45678901"
                      maxlength="12"
                    />
                    <button
                      type="button"
                      class="doc-validate-btn"
                      (click)="simularConsultaReniec()"
                      title="Validar identidad"
                    >
                      Validar
                    </button>
                  </div>
                </oefa-form-field>
              </div>

              <div class="form-grid-1">
                <oefa-form-field label="Nombres y Apellidos o Razón Social" [required]="true">
                  <input
                    type="text"
                    class="form-input"
                    [(ngModel)]="formData.nombreCompleto"
                    placeholder="Ingrese nombres completos o denominación de la persona jurídica"
                  />
                </oefa-form-field>
              </div>

              <div class="form-grid-3">
                <oefa-form-field label="Departamento" [required]="true">
                  <select class="form-select" [(ngModel)]="formData.departamento">
                    <option value="LIMA">LIMA</option>
                    <option value="AREQUIPA">AREQUIPA</option>
                    <option value="CUSCO">CUSCO</option>
                    <option value="PIURA">PIURA</option>
                    <option value="LORETO">LORETO</option>
                  </select>
                </oefa-form-field>

                <oefa-form-field label="Provincia" [required]="true">
                  <select class="form-select" [(ngModel)]="formData.provincia">
                    <option value="LIMA">LIMA</option>
                    <option value="BARRANCA">BARRANCA</option>
                    <option value="CAÑETE">CAÑETE</option>
                    <option value="HUARAL">HUARAL</option>
                  </select>
                </oefa-form-field>

                <oefa-form-field label="Distrito" [required]="true">
                  <select class="form-select" [(ngModel)]="formData.distrito">
                    <option value="JESUS MARIA">JESÚS MARÍA</option>
                    <option value="SAN ISIDRO">SAN ISIDRO</option>
                    <option value="MIRAFLORES">MIRAFLORES</option>
                    <option value="LIMA">CERCADO DE LIMA</option>
                  </select>
                </oefa-form-field>
              </div>

              <div class="form-grid-1">
                <oefa-form-field label="Domicilio Físico Completo" [required]="true" help="Av., Jr., Calle, N°, Urb. / Referencia">
                  <input
                    type="text"
                    class="form-input"
                    [(ngModel)]="formData.domicilio"
                    placeholder="Ej: Av. Faustino Sánchez Carrión 603, Jesús María"
                  />
                </oefa-form-field>
              </div>

              <!-- Sección Opcional Plegable: Variables de Inclusión y Contacto -->
              <oefa-collapsible
                title="Información de Contacto y Datos Opcionales de Enfoque Diferencial"
                badge="OPCIONAL"
                variant="dashed"
                style="margin-top: 14px;">
                <div class="form-grid-2">
                  <oefa-form-field label="Teléfono de Contacto" help="Para coordinaciones de entrega">
                    <input type="tel" class="form-input" [(ngModel)]="formData.telefono" placeholder="Ej: 987654321" />
                  </oefa-form-field>

                  <oefa-form-field label="Correo Electrónico de Contacto" help="Para confirmación de recepción">
                    <input type="email" class="form-input" [(ngModel)]="formData.email" placeholder="usuario@dominio.com" />
                  </oefa-form-field>
                </div>

                <div class="form-grid-3">
                  <oefa-form-field label="Sexo">
                    <select class="form-select" [(ngModel)]="formData.sexo">
                      <option value="">Seleccione...</option>
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                      <option value="NE">No especifica</option>
                    </select>
                  </oefa-form-field>

                  <oefa-form-field label="Discapacidad">
                    <select class="form-select" [(ngModel)]="formData.discapacidad">
                      <option value="NO">No presenta</option>
                      <option value="SI">Presenta discapacidad</option>
                    </select>
                  </oefa-form-field>

                  <oefa-form-field label="Lengua Materna">
                    <select class="form-select" [(ngModel)]="formData.lenguaMaterna">
                      <option value="CASTELLANO">Castellano</option>
                      <option value="QUECHUA">Quechua</option>
                      <option value="AYMARA">Aimara</option>
                      <option value="OTRA">Otra lengua originaria</option>
                    </select>
                  </oefa-form-field>
                </div>
              </oefa-collapsible>
            </section>
          }

          <!-- ========================================================
               PASO 2: INFORMACIÓN SOLICITADA Y ENTREGA
               ======================================================== -->
          @if (currentStep === 2) {
            <section aria-labelledby="step2-title">
              <div class="step-header">
                <h2 id="step2-title" class="step-title">2. Información Solicitada y Modalidad de Entrega</h2>
                <p class="step-description">Describa claramente la información ambiental requerida y elija el soporte de reproducción.</p>
              </div>

              <div class="form-grid-1">
                <oefa-form-field label="Dependencia que posee la información (Opcional)" help="Si conoce la Dirección o Unidad interna del OEFA">
                  <input
                    type="text"
                    class="form-input"
                    [(ngModel)]="formData.dependencia"
                    placeholder="Ej: Subdirección de Fiscalización en Energía y Minas"
                  />
                </oefa-form-field>
              </div>

              <div class="form-grid-1">
                <oefa-form-field
                  label="Detalle de la Información Solicitada"
                  [required]="true"
                  [help]="'Caracteres: ' + formData.informacion.length + ' / 1000. Describa de forma precisa datos, fechas o expediente.'"
                >
                  <textarea
                    class="form-textarea"
                    rows="5"
                    maxlength="1000"
                    [(ngModel)]="formData.informacion"
                    placeholder="Solicito copia simple o digital de las actas de supervisión ambiental correspondientes al proyecto..."
                    aria-describedby="char-count-status"
                  ></textarea>
                </oefa-form-field>
                <div id="char-count-status" class="sr-only" aria-live="polite">
                  {{ formData.informacion.length }} caracteres ingresados de 1000 permitidos.
                </div>
              </div>

              <div class="selection-section">
                <label class="section-label">
                  Forma o Modalidad de Entrega (Tarifario TUPA D.S. N° 164-2020-PCM)
                  <span class="required-indicator" aria-hidden="true">*</span>
                </label>
                <div class="selection-cards-grid">
                  <oefa-selection-card
                    name="entrega"
                    title="Correo Electrónico (Digital)"
                    description="Envío de enlaces de descarga directa sin costo alguno."
                    priceBadge="GRATUITO"
                    badgeVariant="success"
                    [selected]="formData.modalidadEntrega === 'EMAIL'"
                    (selectionChange)="formData.modalidadEntrega = 'EMAIL'"
                  ></oefa-selection-card>

                  <oefa-selection-card
                    name="entrega"
                    title="Copia Simple (Papel A4)"
                    description="Impresión en mesa de partes física del OEFA."
                    priceBadge="S/. 0.08 / pág."
                    badgeVariant="primary"
                    [selected]="formData.modalidadEntrega === 'COPIA'"
                    (selectionChange)="formData.modalidadEntrega = 'COPIA'"
                  ></oefa-selection-card>

                  <oefa-selection-card
                    name="entrega"
                    title="Disco Óptico (CD / DVD)"
                    description="Grabación digital en soporte físico para retiro presencial."
                    priceBadge="S/. 1.00 / unidad"
                    badgeVariant="tertiary"
                    [selected]="formData.modalidadEntrega === 'CD'"
                    (selectionChange)="formData.modalidadEntrega = 'CD'"
                  ></oefa-selection-card>
                </div>
              </div>
            </section>
          }

          <!-- ========================================================
               PASO 3: NOTIFICACIÓN Y DOCUMENTOS
               ======================================================== -->
          @if (currentStep === 3) {
            <section aria-labelledby="step3-title">
              <div class="step-header">
                <h2 id="step3-title" class="step-title">3. Modalidad de Notificación y Sustento Documental</h2>
                <p class="step-description">Defina cómo desea recibir la respuesta formal y adjunte documentos opcionales.</p>
              </div>

              <div class="selection-section">
                <label class="section-label">
                  Canal de Notificación de la Respuesta
                  <span class="required-indicator" aria-hidden="true">*</span>
                </label>
                <div class="selection-cards-grid">
                  <oefa-selection-card
                    name="notif"
                    title="Notificación por Correo Electrónico"
                    description="Comunicación oficial inmediata según TUO de la LPAG."
                    priceBadge="Recomendado"
                    badgeVariant="primary"
                    [selected]="formData.modalidadNotificacion === 'EMAIL'"
                    (selectionChange)="formData.modalidadNotificacion = 'EMAIL'"
                  ></oefa-selection-card>

                  <oefa-selection-card
                    name="notif"
                    title="Notificación a Domicilio Físico"
                    description="Entrega por mensajería institucional en la dirección señalada."
                    priceBadge="Presencial"
                    badgeVariant="neutral"
                    [selected]="formData.modalidadNotificacion === 'DOMICILIO'"
                    (selectionChange)="formData.modalidadNotificacion = 'DOMICILIO'"
                  ></oefa-selection-card>
                </div>
              </div>

              <!-- Cumplimiento WCAG 2.2 SC 3.3.7 (Redundant Entry): Reutilización de datos del Paso 1 -->
              @if (formData.modalidadNotificacion === 'EMAIL') {
                <div class="redundancy-box">
                  <div class="form-grid-1">
                    <oefa-form-field
                      label="Correo Electrónico para Notificación"
                      [required]="true"
                      help="Dirección confirmada para recibir las resoluciones y respuestas"
                    >
                      <input
                        type="email"
                        class="form-input"
                        [(ngModel)]="formData.emailNotificacion"
                        placeholder="usuario@dominio.com"
                      />
                    </oefa-form-field>
                  </div>
                  @if (formData.email && formData.email !== formData.emailNotificacion) {
                    <button
                      type="button"
                      class="link-action-btn"
                      (click)="formData.emailNotificacion = formData.email"
                    >
                      Copiar correo ingresado en Paso 1 ({{ formData.email }})
                    </button>
                  }
                </div>
              }

              <!-- Documentos de sustento opcionales con oefa-file-uploader -->
              <div class="uploader-wrapper">
                <oefa-file-uploader
                  label="Documentos de Sustento o Carta Explicativa (Opcional)"
                  hint="Solo archivos .pdf de hasta 10 MB por documento"
                  accept=".pdf"
                  [maxSizeMb]="10"
                  [multiple]="true"
                  (filesChange)="onFilesUploaded($event)"
                ></oefa-file-uploader>
              </div>
            </section>
          }

          <!-- ========================================================
               PASO 4: REVISIÓN Y ENVÍO
               ======================================================== -->
          @if (currentStep === 4) {
            <section aria-labelledby="step4-title">
              <div class="step-header">
                <h2 id="step4-title" class="step-title">4. Revisión y Confirmación de la Solicitud</h2>
                <p class="step-description">Verifique cuidadosamente la información registrada antes de efectuar el envío formal (WCAG 2.2 SC 3.3.4).</p>
              </div>

              <!-- Tarjetas de Resumen de los Pasos Anteriores -->
              <div class="review-cards-list">
                <!-- Resumen Solicitante -->
                <div class="review-card">
                  <div class="review-header">
                    <div class="review-header-title">
                      <span class="review-num">1</span>
                      <h3>Datos del Solicitante</h3>
                    </div>
                    <button type="button" class="btn-edit-step" (click)="goToStep(1)">Modificar</button>
                  </div>
                  <div class="review-grid">
                    <div>
                      <span class="review-label">Identificación:</span>
                      <span class="review-value">{{ formData.tipoDoc }} N° {{ formData.nroDoc || 'Sin especificar' }}</span>
                    </div>
                    <div>
                      <span class="review-label">Nombre / Razón Social:</span>
                      <span class="review-value">{{ formData.nombreCompleto || 'Sin especificar' }}</span>
                    </div>
                    <div>
                      <span class="review-label">Ubicación:</span>
                      <span class="review-value">{{ formData.distrito }}, {{ formData.provincia }}, {{ formData.departamento }}</span>
                    </div>
                    <div>
                      <span class="review-label">Domicilio:</span>
                      <span class="review-value">{{ formData.domicilio || 'Sin especificar' }}</span>
                    </div>
                  </div>
                </div>

                <!-- Resumen Solicitud -->
                <div class="review-card">
                  <div class="review-header">
                    <div class="review-header-title">
                      <span class="review-num">2</span>
                      <h3>Información Solicitada y Soporte</h3>
                    </div>
                    <button type="button" class="btn-edit-step" (click)="goToStep(2)">Modificar</button>
                  </div>
                  <div class="review-grid-full">
                    <div>
                      <span class="review-label">Contenido Solicitado:</span>
                      <p class="review-textarea-preview">{{ formData.informacion || 'No se ingresó descripción.' }}</p>
                    </div>
                    <div style="margin-top: 10px;">
                      <span class="review-label">Modalidad de Entrega:</span>
                      <span class="review-value font-bold">
                        {{ getModalidadEntregaLabel(formData.modalidadEntrega) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Resumen Notificación y Anexos -->
                <div class="review-card">
                  <div class="review-header">
                    <div class="review-header-title">
                      <span class="review-num">3</span>
                      <h3>Canal de Notificación y Archivos</h3>
                    </div>
                    <button type="button" class="btn-edit-step" (click)="goToStep(3)">Modificar</button>
                  </div>
                  <div class="review-grid">
                    <div>
                      <span class="review-label">Medio de Notificación:</span>
                      <span class="review-value">{{ formData.modalidadNotificacion === 'EMAIL' ? 'Correo Electrónico (' + formData.emailNotificacion + ')' : 'Domicilio Físico' }}</span>
                    </div>
                    <div>
                      <span class="review-label">Archivos Adjuntados:</span>
                      <span class="review-value">{{ uploadedCount }} documento(s) PDF adjuntado(s)</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Declaración Jurada de Veracidad -->
              <div class="declaration-box">
                <label class="declaration-label">
                  <input
                    type="checkbox"
                    [(ngModel)]="formData.declaracionAceptada"
                    class="declaration-check"
                  />
                  <span>
                    Declaro bajo juramento que los datos consignados en la presente solicitud son verídicos y auténticos, de conformidad con el principio de presunción de veracidad establecido en el TUO de la Ley N° 27444.
                  </span>
                </label>
              </div>

              <!-- Pantalla de confirmación simulada al enviar -->
              @if (isSubmitted) {
                <div style="margin-top: 20px;">
                  <oefa-alert
                    type="success"
                    title="¡Solicitud Registrada con Éxito!"
                  >
                    <p style="margin: 4px 0 0 0;">
                      Se ha generado su constancia de registro N° <strong>SAIP-2026-00412</strong>. Se envió copia del cargo al correo <strong>{{ formData.emailNotificacion || formData.email }}</strong>.
                    </p>
                  </oefa-alert>
                </div>
              }
            </section>
          }
        </div>

        <!-- Barra Inferior de Navegación y Acciones -->
        <footer class="stepper-actions-bar">
          <div>
            @if (currentStep > 1 && !isSubmitted) {
              <oefa-button variant="secondary" (clicked)="prevStep()">
                ← Anterior
              </oefa-button>
            }
          </div>

          <div class="right-actions">
            @if (currentStep < 4) {
              <oefa-button variant="primary" (clicked)="nextStep()">
                Siguiente →
              </oefa-button>
            } @else if (!isSubmitted) {
              <oefa-button
                variant="primary"
                [disabled]="!formData.declaracionAceptada"
                (clicked)="submitSolicitud()"
              >
                Enviar Solicitud
              </oefa-button>
            } @else {
              <oefa-button variant="secondary" (clicked)="reiniciarFormulario()">
                Nueva Solicitud
              </oefa-button>
            }
          </div>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 24px;
      box-sizing: border-box;
      background-color: var(--oefa-surface-workspace);
      min-height: calc(100vh - var(--oefa-header-height, 64px));
    }

    .saip-view-container {
      max-width: 1040px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Encabezado */
    .saip-header-card {
      background: var(--oefa-surface-card, #ffffff);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-lg, 12px);
      padding: 24px 28px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    .badge-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    .oefa-badge-primary {
      background-color: var(--oefa-primary-container, #eef4ff);
      color: var(--oefa-primary-root, #144aa7);
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.04em;
    }

    .legal-badge {
      font-size: 0.75rem;
      color: var(--oefa-text-muted, #94a3b8);
      font-weight: 500;
    }

    .saip-title {
      font-family: var(--oefa-font-display, inherit);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      margin: 0 0 6px 0;
      line-height: 1.25;
    }

    .saip-subtitle {
      font-size: 0.875rem;
      color: var(--oefa-text-secondary, #475569);
      margin: 0;
      line-height: 1.4;
      max-width: 720px;
    }

    .manual-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: var(--oefa-radius-md, 8px);
      border: 1px solid var(--oefa-border-color, #cbd5e1);
      color: var(--oefa-primary-root, #144aa7);
      text-decoration: none;
      font-size: 0.8125rem;
      font-weight: 600;
      background: var(--oefa-surface-subtle, #f8fafc);
      transition: all 0.2s ease;
      white-space: nowrap;

      &:hover {
        background: var(--oefa-primary-container, #eef4ff);
        border-color: var(--oefa-primary-root, #144aa7);
      }
    }

    /* Shell del Formulario con Stepper */
    .saip-card-shell {
      background: var(--oefa-surface-card, #ffffff);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-lg, 12px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
    }

    .stepper-section {
      padding: 24px 32px 18px 32px;
      border-bottom: 1px solid var(--oefa-border-color, #e2e8f0);
    }

    .stepper-content-body {
      padding: 32px;
      min-height: 380px;

      @media (max-width: 640px) {
        padding: 20px;
      }
    }

    .step-header {
      margin-bottom: 24px;
    }

    .step-title {
      font-family: var(--oefa-font-display, inherit);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      margin: 0 0 4px 0;
    }

    .step-description {
      font-size: 0.875rem;
      color: var(--oefa-text-secondary, #475569);
      margin: 0;
    }

    /* Grids de formulario */
    .form-grid-1 { display: grid; grid-template-columns: 1fr; gap: 18px; margin-bottom: 18px; }
    .form-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-bottom: 18px; }
    .form-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; margin-bottom: 18px; }

    .doc-search-wrapper {
      display: flex;
      gap: 8px;
    }

    .doc-validate-btn {
      padding: 0 14px;
      background: var(--oefa-primary-root, #144aa7);
      color: #ffffff;
      border: none;
      border-radius: var(--oefa-radius-sm, 6px);
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        opacity: 0.9;
      }
    }

    /* Grids de Tarjetas de Selección */
    .selection-section {
      margin-top: 24px;
    }

    .section-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--oefa-text-primary, #0f172a);
      margin-bottom: 12px;
    }

    .required-indicator {
      color: var(--oefa-error-root, #e51a2f);
    }

    .selection-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .redundancy-box {
      margin-top: 16px;
      padding: 16px;
      background: var(--oefa-surface-subtle, #f8fafc);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-md, 8px);
    }

    .link-action-btn {
      background: transparent;
      border: none;
      color: var(--oefa-primary-root, #144aa7);
      text-decoration: underline;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      margin-top: 6px;
    }

    .uploader-wrapper {
      margin-top: 24px;
    }

    /* Revisión Paso 4 */
    .review-cards-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .review-card {
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-md, 8px);
      padding: 18px 20px;
      background: var(--oefa-surface-subtle, #f8fafc);
    }

    .review-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--oefa-border-color, #e2e8f0);
      padding-bottom: 10px;
      margin-bottom: 12px;
    }

    .review-header-title {
      display: flex;
      align-items: center;
      gap: 10px;

      h3 {
        margin: 0;
        font-size: 0.9375rem;
        font-weight: 700;
        color: var(--oefa-text-primary, #0f172a);
      }
    }

    .review-num {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--oefa-primary-root, #144aa7);
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-edit-step {
      background: transparent;
      border: none;
      color: var(--oefa-primary-root, #144aa7);
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
    }

    .review-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    .review-label {
      display: block;
      font-size: 0.75rem;
      color: var(--oefa-text-muted, #94a3b8);
      margin-bottom: 2px;
    }

    .review-value {
      font-size: 0.875rem;
      color: var(--oefa-text-primary, #0f172a);
      font-weight: 500;
    }

    .review-textarea-preview {
      margin: 4px 0 0 0;
      font-size: 0.875rem;
      color: var(--oefa-text-primary, #0f172a);
      background: var(--oefa-surface-card, #ffffff);
      padding: 10px;
      border-radius: 6px;
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      white-space: pre-wrap;
    }

    .declaration-box {
      margin-top: 20px;
      padding: 16px;
      border: 1px solid var(--oefa-border-color, #cbd5e1);
      border-radius: var(--oefa-radius-md, 8px);
      background: var(--oefa-surface-card, #ffffff);
    }

    .declaration-label {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      cursor: pointer;
      font-size: 0.8125rem;
      line-height: 1.45;
      color: var(--oefa-text-primary, #0f172a);
    }

    .declaration-check {
      margin-top: 3px;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    /* Barra inferior */
    .stepper-actions-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-top: 1px solid var(--oefa-border-color, #e2e8f0);
      background: var(--oefa-surface-card, #ffffff);
      border-bottom-left-radius: var(--oefa-radius-lg, 12px);
      border-bottom-right-radius: var(--oefa-radius-lg, 12px);
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
  `]
})
export class SaipFormComponent {
  currentStep = 1;
  isSubmitted = false;
  uploadedCount = 0;

  steps: OefaStepItem[] = [
    { title: 'Solicitante', description: 'Datos del titular' },
    { title: 'Información', description: 'Detalle y soporte' },
    { title: 'Notificación', description: 'Canal y anexos' },
    { title: 'Confirmación', description: 'Revisión y envío' }
  ];

  formData = {
    tipoDoc: 'DNI',
    nroDoc: '45678901',
    nombreCompleto: 'JUAN CARLOS ALVAREZ ALVARADO',
    departamento: 'LIMA',
    provincia: 'LIMA',
    distrito: 'JESUS MARIA',
    domicilio: 'Av. Faustino Sánchez Carrión 603, Jesús María',
    telefono: '987654321',
    email: 'jalvareza@oefa.gob.pe',
    sexo: 'M',
    discapacidad: 'NO',
    lenguaMaterna: 'CASTELLANO',
    dependencia: 'Subdirección de Fiscalización Ambiental',
    informacion: 'Solicito copia en formato digital del informe final de supervisión y fiscalización ambiental del expediente N° EXP-2025-OEFA-001.',
    modalidadEntrega: 'EMAIL',
    modalidadNotificacion: 'EMAIL',
    emailNotificacion: 'jalvareza@oefa.gob.pe',
    declaracionAceptada: false
  };

  goToStep(step: number): void {
    if (step >= 1 && step <= 4) {
      this.currentStep = step;
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  simularConsultaReniec(): void {
    if (this.formData.nroDoc.length === 8) {
      this.formData.nombreCompleto = 'CARLOS ENRIQUE MENDOZA RÍOS';
    }
  }

  onFilesUploaded(files: File[]): void {
    this.uploadedCount = files.length;
  }

  getModalidadEntregaLabel(key: string): string {
    switch (key) {
      case 'EMAIL': return 'Correo Electrónico (Gratuito)';
      case 'COPIA': return 'Copia Simple A4 (S/. 0.08 / pág.)';
      case 'CD': return 'Disco Óptico CD / DVD (S/. 1.00)';
      default: return 'No definida';
    }
  }

  submitSolicitud(): void {
    this.isSubmitted = true;
  }

  reiniciarFormulario(): void {
    this.isSubmitted = false;
    this.currentStep = 1;
    this.formData.declaracionAceptada = false;
  }
}
