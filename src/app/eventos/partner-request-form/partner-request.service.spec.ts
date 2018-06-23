import { TestBed, inject } from '@angular/core/testing';

import { PartnerRequestService } from './partner-request.service';

describe('PartnerRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnerRequestService]
    });
  });

  it('should be created', inject([PartnerRequestService], (service: PartnerRequestService) => {
    expect(service).toBeTruthy();
  }));
});
