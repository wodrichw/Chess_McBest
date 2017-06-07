import { TestBed, inject } from '@angular/core/testing';

import { InquireUserService } from './inquire-user.service';

describe('InquireUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InquireUserService]
    });
  });

  it('should be created', inject([InquireUserService], (service: InquireUserService) => {
    expect(service).toBeTruthy();
  }));
});
