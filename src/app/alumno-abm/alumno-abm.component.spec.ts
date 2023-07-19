import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAbmComponent } from './alumno-abm.component';

describe('AlumnoAbmComponent', () => {
  let component: AlumnoAbmComponent;
  let fixture: ComponentFixture<AlumnoAbmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoAbmComponent]
    });
    fixture = TestBed.createComponent(AlumnoAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
