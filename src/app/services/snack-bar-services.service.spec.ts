import { TestBed, inject } from '@angular/core/testing';

import { SnackBarServicesService } from './snack-bar-services.service';

describe('SnackBarServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarServicesService]
    });
  });

  it('should be created', inject([SnackBarServicesService], (service: SnackBarServicesService) => {
    expect(service).toBeTruthy();
  }));
});
