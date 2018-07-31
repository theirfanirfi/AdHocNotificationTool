import { TestBed, inject } from '@angular/core/testing';

import { HtpService } from './htp.service';

describe('HtpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtpService]
    });
  });

  it('should be created', inject([HtpService], (service: HtpService) => {
    expect(service).toBeTruthy();
  }));
});
