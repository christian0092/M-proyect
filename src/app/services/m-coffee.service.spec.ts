import { TestBed, inject } from '@angular/core/testing';

import { MCoffeeService } from './m-coffee.service';

describe('MCoffeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MCoffeeService]
    });
  });

  it('should be created', inject([MCoffeeService], (service: MCoffeeService) => {
    expect(service).toBeTruthy();
  }));
});
