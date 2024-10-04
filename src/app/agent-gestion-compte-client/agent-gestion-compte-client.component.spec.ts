import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGestionCompteClientComponent } from './agent-gestion-compte-client.component';

describe('AgentGestionCompteClientComponent', () => {
  let component: AgentGestionCompteClientComponent;
  let fixture: ComponentFixture<AgentGestionCompteClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentGestionCompteClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGestionCompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
