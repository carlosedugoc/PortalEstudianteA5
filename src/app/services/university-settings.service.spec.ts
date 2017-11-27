import { TestBed, inject } from '@angular/core/testing';

import { UniversitySettingsService } from './university-settings.service';

describe('UniversitySettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversitySettingsService]
    });
  });

  it('should be created', inject([UniversitySettingsService], (service: UniversitySettingsService) => {
    expect(service).toBeTruthy();
  }));
});
