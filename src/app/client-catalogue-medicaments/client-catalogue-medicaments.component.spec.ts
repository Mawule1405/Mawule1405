import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCatalogueMedicamentsComponent } from './client-catalogue-medicaments.component';

describe('ClientCatalogueMedicamentsComponent', () => {
  let component: ClientCatalogueMedicamentsComponent;
  let fixture: ComponentFixture<ClientCatalogueMedicamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCatalogueMedicamentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCatalogueMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
