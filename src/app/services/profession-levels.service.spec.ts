import { TestBed, inject } from '@angular/core/testing';

import { ProfessionLevelsService } from './profession-levels.service';

describe('ProfessionLevelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessionLevelsService]
    });
  });

  it('should be created', inject([ProfessionLevelsService], (service: ProfessionLevelsService) => {
    expect(service).toBeTruthy();
  }));
});
