import { TestBed, inject } from '@angular/core/testing';

import { EditprofileService } from './editprofile.service';

describe('EditprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditprofileService]
    });
  });

  it('should be created', inject([EditprofileService], (service: EditprofileService) => {
    expect(service).toBeTruthy();
  }));
});
