import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGestionStocksComponent } from './agent-gestion-stocks.component';

describe('AgentGestionStocksComponent', () => {
  let component: AgentGestionStocksComponent;
  let fixture: ComponentFixture<AgentGestionStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentGestionStocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGestionStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
