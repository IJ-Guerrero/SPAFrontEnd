import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadaesYproyectosComponent } from './habilidadaes-yproyectos.component';

describe('HabilidadaesYproyectosComponent', () => {
  let component: HabilidadaesYproyectosComponent;
  let fixture: ComponentFixture<HabilidadaesYproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilidadaesYproyectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabilidadaesYproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
