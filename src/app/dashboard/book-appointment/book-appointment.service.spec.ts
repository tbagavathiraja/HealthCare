import { TestBed, inject } from '@angular/core/testing';

import { BookAppointmentService } from './book-appointment.service';

describe('BookAppointmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookAppointmentService]
    });
  });

  it('should be created', inject([BookAppointmentService], (service: BookAppointmentService) => {
    expect(service).toBeTruthy();
  }));
});
