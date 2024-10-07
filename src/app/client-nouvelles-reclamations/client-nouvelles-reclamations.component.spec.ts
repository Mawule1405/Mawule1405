import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNouvellesReclamationsComponent } from './client-nouvelles-reclamations.component';

describe('ClientNouvellesReclamationsComponent', () => {
  let component: ClientNouvellesReclamationsComponent;
  let fixture: ComponentFixture<ClientNouvellesReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientNouvellesReclamationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientNouvellesReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
