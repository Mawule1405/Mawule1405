import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGestionCommandesComponent } from './agent-gestion-commandes.component';

describe('AgentGestionCommandesComponent', () => {
  let component: AgentGestionCommandesComponent;
  let fixture: ComponentFixture<AgentGestionCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentGestionCommandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGestionCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
