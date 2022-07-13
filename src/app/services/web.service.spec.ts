import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

import { WebService } from './web.service';

describe('WebService', () => {
  let service: WebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get', 'put']),
        },
      ],
    }).compileComponents();
    service = TestBed.inject(WebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Starship List with 10 Starships', (done: DoneFn) => {
    service.getAllStarships().subscribe((resultObject) => {
      expect(resultObject.results.length).toEqual(10);
      done();
    });
  });
});
