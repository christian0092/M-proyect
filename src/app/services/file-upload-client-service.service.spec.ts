import { TestBed, inject } from '@angular/core/testing';

import { FileUploadClientServiceService } from './file-upload-client-service.service';

describe('FileUploadClientServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadClientServiceService]
    });
  });

  it('should be created', inject([FileUploadClientServiceService], (service: FileUploadClientServiceService) => {
    expect(service).toBeTruthy();
  }));
});
