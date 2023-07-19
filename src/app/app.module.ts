import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AlumnoListaComponent } from './alumno-lista/alumno-lista.component';
import { AlumnoAbmComponent } from './alumno-abm/alumno-abm.component';
import { AppRoutingModule } from './app-routing.module';
import { TituloDirective } from './directives/titulo.directive';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AlumnoListaComponent,
    AlumnoAbmComponent,
    TituloDirective,
    NombreCompletoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
