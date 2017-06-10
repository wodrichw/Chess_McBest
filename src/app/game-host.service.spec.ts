import { TestBed, inject } from '@angular/core/testing';

import { GameHostService } from './game-host.service';

describe('GameHostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameHostService]
    });
  });

  it('should be created', inject([GameHostService], (service: GameHostService) => {
    expect(service).toBeTruthy();
  }));
});
