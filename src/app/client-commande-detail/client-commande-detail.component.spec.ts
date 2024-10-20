import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCommandeDetailComponent } from './client-commande-detail.component';

describe('ClientCommandeDetailComponent', () => {
  let component: ClientCommandeDetailComponent;
  let fixture: ComponentFixture<ClientCommandeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCommandeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCommandeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
