import { TestBed } from '@angular/core/testing';

import { FormGaleniqueService } from './form-galenique.service';

describe('FormGaleniqueService', () => {
  let service: FormGaleniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormGaleniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
