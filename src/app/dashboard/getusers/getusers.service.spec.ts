import { TestBed, inject } from '@angular/core/testing';

import { GetusersService } from './getusers.service';

describe('GetusersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetusersService]
    });
  });

  it('should be created', inject([GetusersService], (service: GetusersService) => {
    expect(service).toBeTruthy();
  }));
});
