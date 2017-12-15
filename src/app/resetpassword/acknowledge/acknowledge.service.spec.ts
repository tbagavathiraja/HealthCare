import { TestBed, inject } from '@angular/core/testing';

import { AcknowledgeService } from './acknowledge.service';

describe('AcknowledgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcknowledgeService]
    });
  });

  it('should be created', inject([AcknowledgeService], (service: AcknowledgeService) => {
    expect(service).toBeTruthy();
  }));
});
