import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGestionReclamationsComponent } from './agent-gestion-reclamations.component';

describe('AgentGestionReclamationsComponent', () => {
  let component: AgentGestionReclamationsComponent;
  let fixture: ComponentFixture<AgentGestionReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentGestionReclamationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGestionReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
