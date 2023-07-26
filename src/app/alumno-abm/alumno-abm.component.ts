import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-alumno-abm',
  templateUrl: './alumno-abm.component.html',
  styleUrls: ['./alumno-abm.component.css'],
})
export class AlumnoAbmComponent implements OnDestroy {
  alumnos$: Observable<Alumno[]>;
  private alumnosSubscription: Subscription | undefined;
  
  alumnoSeleccionado: Alumno | null = null;
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private alumnoService: AlumnoService) {
    this.alumnos$ = this.alumnoService.getAlumnos();

    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.alumnosSubscription = this.alumnos$.subscribe();
  }

  guardarAlumno(): void {
    if (this.formulario.valid) {
      const alumno: Alumno = {
        id: this.getNextId(),
        nombre: this.formulario.get('nombre')?.value,
        apellido: this.formulario.get('apellido')?.value,
        email: this.formulario.get('email')?.value,
      };

      this.alumnoService.agregarAlumno(alumno);
      this.limpiarFormulario();
    }
  }

  editarAlumno(alumno: Alumno): void {
    this.alumnoSeleccionado = alumno;
    this.formulario.patchValue({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email
    });
  }

  modificarAlumno(): void {
    if (this.formulario.valid && this.alumnoSeleccionado) {
      const alumnoModificado: Alumno = {
        id: this.alumnoSeleccionado.id,
        nombre: this.formulario.get('nombre')?.value,
        apellido: this.formulario.get('apellido')?.value,
        email: this.formulario.get('email')?.value
      };

      this.alumnoService.modificarAlumno(alumnoModificado);
      this.limpiarFormulario();
      this.alumnoSeleccionado = null;
    }
  }

  eliminarAlumno(alumno: Alumno): void {
    this.alumnoService.borrarAlumno(alumno);
  }

  limpiarFormulario(): void {
    this.formulario.reset();
    this.alumnoSeleccionado = null;
  }
  
  getNextId(): number {
    return this.alumnoService.getNextId();
  }

  ngOnDestroy(): void {
    if (this.alumnosSubscription) {
      this.alumnosSubscription.unsubscribe();
    }
  }
}
