import { TestBed, inject } from '@angular/core/testing';

import { VerificarCorreoService } from './verificar-correo.service';

describe('VerificarCorreoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificarCorreoService]
    });
  });

  it('should be created', inject([VerificarCorreoService], (service: VerificarCorreoService) => {
    expect(service).toBeTruthy();
  }));
});
