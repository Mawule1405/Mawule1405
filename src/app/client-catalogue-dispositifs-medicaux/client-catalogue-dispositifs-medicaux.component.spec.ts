import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCatalogueDispositifsMedicauxComponent } from './client-catalogue-dispositifs-medicaux.component';

describe('ClientCatalogueDispositifsMedicauxComponent', () => {
  let component: ClientCatalogueDispositifsMedicauxComponent;
  let fixture: ComponentFixture<ClientCatalogueDispositifsMedicauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCatalogueDispositifsMedicauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCatalogueDispositifsMedicauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
