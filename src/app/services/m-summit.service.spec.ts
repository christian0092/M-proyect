import { TestBed, inject } from '@angular/core/testing';

import { MSummitService } from './m-summit.service';

describe('MSummitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MSummitService]
    });
  });

  it('should be created', inject([MSummitService], (service: MSummitService) => {
    expect(service).toBeTruthy();
  }));
});
