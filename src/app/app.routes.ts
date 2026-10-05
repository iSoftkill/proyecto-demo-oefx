import { Routes } from '@angular/router';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { LoginComponent } from './views/login/login.component';

// PROYECTO ------------------------------------

import { InicioComponent } from './views/inicio/inicio.component';
import { TablerosComponent } from './views/configuraciones/tableros/tableros.component';
import { VisorTableroComponent } from './views/catalogo/visor-tablero/visor-tablero.component';

export const routes: Routes = [

  // PROYECTO ------------------------------------

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/:id', component: VisorTableroComponent },


  { path: 'inicio', component: InicioComponent },
  {
    path: 'configuraciones',
    children: [
      { path: '', redirectTo: 'tableros', pathMatch: 'full' },
      { path: 'tableros', component: TablerosComponent }
    ]
  },

  // Wildcard SIEMPRE al final

  { path: '**', redirectTo: 'inicio' },

];
