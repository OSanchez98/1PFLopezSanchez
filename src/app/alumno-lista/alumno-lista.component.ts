import { Component, Input } from '@angular/core';
import { Alumno } from '../interfaces/alumno.interface';

@Component({
  selector: 'app-alumno-lista',
  templateUrl: './alumno-lista.component.html',
  styleUrls: ['./alumno-lista.component.css']
})
export class AlumnoListaComponent {

  alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juanPerez@hotmail.com' },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'MGomez@hotmal.com' },
    { id: 3, nombre: 'Pedro', apellido: 'López', email: 'Pedro06@gmail.com' }
  ];

  constructor() { }
}
