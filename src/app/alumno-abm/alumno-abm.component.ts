import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../interfaces/alumno.interface';

@Component({
  selector: 'app-alumno-abm',
  templateUrl: './alumno-abm.component.html',
  styleUrls: ['./alumno-abm.component.css']
})
export class AlumnoAbmComponent {
  @Output() alumnosActualizados = new EventEmitter<Alumno[]>();

  alumnoSeleccionado: Alumno | null = null;

  formulario: FormGroup;
  alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juanPerez@hotmail.com' },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'MGomez@hotmal.com' },
    { id: 3, nombre: 'Pedro', apellido: 'López', email: 'Pedro06@gmail.com' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['']
    });
  }

  guardarAlumno(): void {
    if (this.formulario.valid) {
      const alumno: Alumno = {
        id: this.alumnoSeleccionado ? this.alumnoSeleccionado.id : this.getNextId(),
        nombre: this.formulario.get('nombre')?.value,
        apellido: this.formulario.get('apellido')?.value,
        email: this.formulario.get('email')?.value
      };
  
      if (this.alumnoSeleccionado) {
        const index = this.alumnos.findIndex(a => a.id === this.alumnoSeleccionado!.id);
        if (index !== -1) {
          this.alumnos[index] = alumno;
        }
      } else {
        this.alumnos.push(alumno);
      }
  
      this.alumnosActualizados.emit(this.alumnos);
      this.limpiarFormulario();
      this.alumnoSeleccionado = null;
    }
  }

  limpiarFormulario(): void {
    this.formulario.reset();
  }

  editarAlumno(alumno: Alumno): void {
    this.alumnoSeleccionado = alumno;
    this.formulario.setValue({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email
    });
  } 

  eliminarAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex(a => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos.splice(index, 1);
      this.alumnosActualizados.emit(this.alumnos);
      if (this.alumnoSeleccionado && this.alumnoSeleccionado.id === alumno.id) {
        this.limpiarFormulario();
        this.alumnoSeleccionado = null;
      }
    }
  }

  getNextId(): number {
    const maxId = Math.max(...this.alumnos.map(a => a.id), 0);
    return maxId + 1;
  }

  modificarAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex(a => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos[index] = alumno;
    }
  }
  

  

  

}
