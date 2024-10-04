import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGestionCompteAgentComponent } from './agent-gestion-compte-agent.component';

describe('AgentGestionCompteAgentComponent', () => {
  let component: AgentGestionCompteAgentComponent;
  let fixture: ComponentFixture<AgentGestionCompteAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentGestionCompteAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGestionCompteAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
