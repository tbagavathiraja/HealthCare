import { TestBed, inject } from '@angular/core/testing';

import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientsService]
    });
  });

  it('should be created', inject([PatientsService], (service: PatientsService) => {
    expect(service).toBeTruthy();
  }));
});
