import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WebService } from '../services/web.service';

import { StarshipsComponent } from './starships.component';

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarshipsComponent],
      providers: [
        {
          provide: WebService,
          useValue: jasmine.createSpyObj('WebService', [
            'getAllStarships',
            'setNextApi',
            'setStarShips',
            'getNextStarships',
            'setCurrentIndex',
            'starships',
          ]),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Starships Component', () => {
    expect(component).toBeTruthy();
  });
});
