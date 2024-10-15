import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompteClientComponent } from './create-compte-client.component';

describe('CreateCompteClientComponent', () => {
  let component: CreateCompteClientComponent;
  let fixture: ComponentFixture<CreateCompteClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCompteClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
