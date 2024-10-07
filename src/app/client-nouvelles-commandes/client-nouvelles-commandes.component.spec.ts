import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNouvellesCommandesComponent } from './client-nouvelles-commandes.component';

describe('ClientNouvellesCommandesComponent', () => {
  let component: ClientNouvellesCommandesComponent;
  let fixture: ComponentFixture<ClientNouvellesCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientNouvellesCommandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientNouvellesCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
