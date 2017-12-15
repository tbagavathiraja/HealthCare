import { TestBed, inject } from '@angular/core/testing';

import { ResetpasswordService } from './resetpassword.service';

describe('ResetpasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetpasswordService]
    });
  });

  it('should be created', inject([ResetpasswordService], (service: ResetpasswordService) => {
    expect(service).toBeTruthy();
  }));
});
