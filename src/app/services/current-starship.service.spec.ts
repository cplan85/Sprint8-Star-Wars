import { TestBed } from '@angular/core/testing';

import { CurrentStarshipService } from './current-starship.service';

describe('CurrentStarshipService', () => {
  let service: CurrentStarshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentStarshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
