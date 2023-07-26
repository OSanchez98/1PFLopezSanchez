import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../interfaces/alumno.interface';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService implements OnDestroy {
  private alumnosSubject: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([]);
  private alumnos: Alumno[] = [];

  constructor() {
    this.fetchAlumnosFromApi().then((alumnos) => {
      this.alumnos = alumnos;
      this.alumnosSubject.next(this.alumnos);
    });
  }

  private async fetchAlumnosFromApi(): Promise<Alumno[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juanPerez@hotmail.com' },
      { id: 2, nombre: 'María', apellido: 'Gómez', email: 'MGomez@hotmal.com' },
      { id: 3, nombre: 'Pedro', apellido: 'López', email: 'Pedro06@gmail.com' },
    ];
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnosSubject.asObservable();
  }

  agregarAlumno(alumno: Alumno): void {
    const newAlumno: Alumno = {
      id: this.getNextId(),
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email,
    };

    this.alumnos.push(newAlumno);
    this.alumnosSubject.next(this.alumnos);
  }

  modificarAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex((a) => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos[index] = alumno;
      this.alumnosSubject.next(this.alumnos);
    }
  }

  borrarAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex((a) => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos.splice(index, 1);
      this.alumnosSubject.next(this.alumnos);
    }
  }

  getNextId(): number {
    const maxId = Math.max(...this.alumnos.map((a) => a.id), 0);
    return maxId + 1;
  }

  ngOnDestroy(): void {
    this.alumnosSubject.complete();
  }
}
