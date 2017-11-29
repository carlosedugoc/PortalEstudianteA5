import { TestBed, inject } from '@angular/core/testing';

import { AdministrationService } from './administracion.service';

describe('AdministrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrationService]
    });
  });

  it('should be created', inject([AdministrationService], (service: AdministrationService) => {
    expect(service).toBeTruthy();
  }));
});
