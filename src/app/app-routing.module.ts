import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoListaComponent } from './alumno-lista/alumno-lista.component';
import { AlumnoAbmComponent } from './alumno-abm/alumno-abm.component';

const routes: Routes = [
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' },
  { path: 'alumnos', component: AlumnoListaComponent },
  { path: 'alumnos/abm', component: AlumnoAbmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
