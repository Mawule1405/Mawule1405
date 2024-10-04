import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGestionComptesComponent } from './agent-gestion-comptes.component';

describe('AgentGestionComptesComponent', () => {
  let component: AgentGestionComptesComponent;
  let fixture: ComponentFixture<AgentGestionComptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentGestionComptesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGestionComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
