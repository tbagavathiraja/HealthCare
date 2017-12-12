import { TestBed, inject } from '@angular/core/testing';

import { AddUserService } from './adduser.service';

describe('AddUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddUserService]
    });
  });

  it('should be created', inject([AddUserService], (service: AddUserService) => {
    expect(service).toBeTruthy();
  }));
});
