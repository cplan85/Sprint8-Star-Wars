import { Observable, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { InfoPageComponent } from './info-page.component';
import { ActivatedRoute } from '@angular/router';

describe('InfoPageComponent', () => {
  let component: InfoPageComponent;
  let fixture: ComponentFixture<InfoPageComponent>;

  class ActivatedRouteMock {
    queryParams = new Observable((observer) => {
      const urlParams = {
        param1: 'some',
        param2: 'params',
      };
      observer.next(urlParams);
      observer.complete();
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPageComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get', 'put']),
        },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
          useValue: {
            queryParams: of({
              param1: '/',
              param2: '/starships',
            }),
          },
        },
        {
          provide: 'starshipsUrl',
          useValue: [{ id: 0, url: 'https://swapi.dev/api/starships/2/' }],
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
