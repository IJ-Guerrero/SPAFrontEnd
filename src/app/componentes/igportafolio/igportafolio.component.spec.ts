import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgportafolioComponent } from './igportafolio.component';

describe('IgportafolioComponent', () => {
  let component: IgportafolioComponent;
  let fixture: ComponentFixture<IgportafolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgportafolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgportafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
