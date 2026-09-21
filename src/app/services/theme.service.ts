import { Injectable, signal, computed, effect } from '@angular/core';

export type AppTheme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'oefa-theme';

  /** Tema configurado por el usuario: 'light', 'dark' o 'system' */
  readonly currentTheme = signal<AppTheme>(this.getInitialTheme());

  /** Señal reactiva que detecta si el sistema operativo está en modo oscuro */
  readonly systemPrefersDark = signal<boolean>(this.checkSystemPreference());

  /** Tema efectivo aplicado: 'light' o 'dark' */
  readonly effectiveTheme = computed<'light' | 'dark'>(() => {
    const theme = this.currentTheme();
    if (theme === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return theme;
  });

  /** Booleano para saber rápidamente si el modo oscuro está activo */
  readonly isDarkMode = computed<boolean>(() => this.effectiveTheme() === 'dark');

  constructor() {
    // Escuchar cambios en la preferencia del sistema operativo
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this.systemPrefersDark.set(e.matches);
      });
    }

    // Sincronizar automáticamente con el DOM y localStorage
    effect(() => {
      const eff = this.effectiveTheme();
      const configured = this.currentTheme();
      this.applyThemeToDOM(eff, configured);
    });
  }

  /**
   * Cambiar el tema activo
   */
  setTheme(theme: AppTheme): void {
    this.currentTheme.set(theme);
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
        window.localStorage.setItem(this.STORAGE_KEY, theme);
      }
    } catch {
      // Fallback seguro si localStorage no está disponible
    }
  }

  /**
   * Alternar rápidamente entre modo claro y oscuro
   */
  toggleTheme(): void {
    const nextTheme: AppTheme = this.isDarkMode() ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  private getInitialTheme(): AppTheme {
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
        const saved = window.localStorage.getItem(this.STORAGE_KEY) as AppTheme;
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          return saved;
        }
      }
    } catch {
      // Fallback seguro si localStorage no está disponible
    }
    return 'system';
  }

  private checkSystemPreference(): boolean {
    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    } catch {
      // Fallback seguro
    }
    return false;
  }

  private applyThemeToDOM(effective: 'light' | 'dark', configured: AppTheme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    if (effective === 'dark') {
      root.setAttribute('data-theme', 'dark');
      body.classList.add('dark-theme');
    } else {
      root.setAttribute('data-theme', 'light');
      body.classList.remove('dark-theme');
    }

    // Metadato del tema para inspección o debugging
    root.setAttribute('data-configured-theme', configured);
  }
}
