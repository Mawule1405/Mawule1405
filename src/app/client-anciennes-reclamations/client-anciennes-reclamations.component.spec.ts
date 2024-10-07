import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAnciennesReclamationsComponent } from './client-anciennes-reclamations.component';

describe('ClientAnciennesReclamationsComponent', () => {
  let component: ClientAnciennesReclamationsComponent;
  let fixture: ComponentFixture<ClientAnciennesReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientAnciennesReclamationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAnciennesReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
