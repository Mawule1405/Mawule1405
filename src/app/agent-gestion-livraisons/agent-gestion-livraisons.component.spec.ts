import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGestionLivraisonsComponent } from './agent-gestion-livraisons.component';

describe('AgentGestionLivraisonsComponent', () => {
  let component: AgentGestionLivraisonsComponent;
  let fixture: ComponentFixture<AgentGestionLivraisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentGestionLivraisonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGestionLivraisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
