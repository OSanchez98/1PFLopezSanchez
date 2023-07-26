import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumnoService } from '../services/alumno.service';
import { Alumno } from '../interfaces/alumno.interface';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alumno-lista',
  templateUrl: './alumno-lista.component.html',
  styleUrls: ['./alumno-lista.component.css'],
})
export class AlumnoListaComponent implements OnDestroy {
  alumnos$: Observable<Alumno[]>;
  private alumnosSubscription: Subscription | undefined;

  searchForm: FormGroup;

  constructor(private alumnoService: AlumnoService, private formBuilder: FormBuilder) {
    this.alumnos$ = this.alumnoService.getAlumnos();

    this.searchForm = this.formBuilder.group({
      search: [''],
    });

    this.alumnosSubscription = this.alumnos$.subscribe();

    this.searchForm.valueChanges.subscribe((value) => {

      // Filtrando los resultados
      const searchTerm = value.search.trim().toLowerCase();

      this.alumnos$ = this.alumnoService.getAlumnos().pipe(
        map((alumnos) =>
          alumnos.filter(
            (alumno) =>
              alumno.nombre.toLowerCase().includes(searchTerm) ||
              alumno.apellido.toLowerCase().includes(searchTerm)
          )
        )
      );
    });
  }

  ngOnDestroy(): void {
    if (this.alumnosSubscription) {
      this.alumnosSubscription.unsubscribe();
    }
  }
}
