import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAnciennesCommandesComponent } from './client-anciennes-commandes.component';

describe('ClientAnciennesCommandesComponent', () => {
  let component: ClientAnciennesCommandesComponent;
  let fixture: ComponentFixture<ClientAnciennesCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientAnciennesCommandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAnciennesCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
