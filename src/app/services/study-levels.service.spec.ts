import { TestBed, inject } from '@angular/core/testing';

import { StudyLevelsService } from './study-levels.service';

describe('StudyLevelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyLevelsService]
    });
  });

  it('should be created', inject([StudyLevelsService], (service: StudyLevelsService) => {
    expect(service).toBeTruthy();
  }));
});
