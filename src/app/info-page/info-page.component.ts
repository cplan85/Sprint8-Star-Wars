import { WebService } from './../services/web.service';
//import { CurrentStarshipService } from './../services/current-starship.service';
import { Component, OnInit } from '@angular/core';
import { Starship } from '../interfaces/starship';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit {
  currentStarship: Starship = {
    image: `../assets/0.png`,
    name: 'CR90 corvette',
    model: 'CR90 corvette',
    manufacturer: 'Corellian Engineering Corporation',
    cost_in_credits: 3500000,
    length: '150',
    max_atmosphering_speed: '950',
    crew: '30-165',
    passengers: 600,
    cargo_capacity: 3000000,
    consumables: '1 year',
    hyperdrive_rating: '2.0',
    MGLT: '60',
    starship_class: 'corvette',
    pilots: [],
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/',
    ],
    created: '2014-12-10T14:20:33.369000Z',
    edited: '2014-12-20T21:23:49.867000Z',
    url: 'https://swapi.dev/api/starships/2/',
  };

  pilots: any[] = [];
  urlId: number = 0;

  starshipUrls: any[] = [
    { id: 0, url: 'https://swapi.dev/api/starships/2/' },
    { id: 1, url: 'https://swapi.dev/api/starships/3/' },
    { id: 2, url: 'https://swapi.dev/api/starships/5/' },
    { id: 3, url: 'https://swapi.dev/api/starships/9/' },
    { id: 4, url: 'https://swapi.dev/api/starships/10/' },
    { id: 5, url: 'https://swapi.dev/api/starships/11/' },
    { id: 6, url: 'https://swapi.dev/api/starships/12/' },
    { id: 7, url: 'https://swapi.dev/api/starships/13/' },
    { id: 8, url: 'https://swapi.dev/api/starships/15/' },
    { id: 9, url: 'https://swapi.dev/api/starships/17/' },
    { id: 10, url: 'https://swapi.dev/api/starships/21/' },
    { id: 11, url: 'https://swapi.dev/api/starships/22/' },
    { id: 12, url: 'https://swapi.dev/api/starships/23/' },
    { id: 13, url: 'https://swapi.dev/api/starships/27/' },
    { id: 14, url: 'https://swapi.dev/api/starships/28/' },
    { id: 15, url: 'https://swapi.dev/api/starships/29/' },
    { id: 16, url: 'https://swapi.dev/api/starships/31/' },
    { id: 17, url: 'https://swapi.dev/api/starships/32/' },
    { id: 18, url: 'https://swapi.dev/api/starships/39/' },
    { id: 19, url: 'https://swapi.dev/api/starships/40/' },
    { id: 20, url: 'https://swapi.dev/api/starships/41/' },
    { id: 21, url: 'https://swapi.dev/api/starships/43/' },
    { id: 22, url: 'https://swapi.dev/api/starships/47/' },
    { id: 23, url: 'https://swapi.dev/api/starships/48/' },
    { id: 24, url: 'https://swapi.dev/api/starships/49/' },
    { id: 25, url: 'https://swapi.dev/api/starships/52/' },
    { id: 26, url: 'https://swapi.dev/api/starships/58/' },
    { id: 27, url: 'https://swapi.dev/api/starships/59/' },
    { id: 28, url: 'https://swapi.dev/api/starships/61/' },
    { id: 29, url: 'https://swapi.dev/api/starships/63/' },
    { id: 30, url: 'https://swapi.dev/api/starships/64/' },
    { id: 31, url: 'https://swapi.dev/api/starships/65/' },
    { id: 32, url: 'https://swapi.dev/api/starships/66/' },
    { id: 33, url: 'https://swapi.dev/api/starships/68/' },
    { id: 34, url: 'https://swapi.dev/api/starships/74/' },
    { id: 35, url: 'https://swapi.dev/api/starships/75/' },
  ];

  getPilots() {
    this.currentStarship.pilots?.forEach((pilot) => {
      this.spinner.show();
      this.webService.getPilot(pilot).subscribe((resultObject) => {
        console.log(resultObject);
        this.spinner.hide();
        this.pilots.push(resultObject);
      });
    });
  }
  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  //have to create component
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.urlId = parseInt(params['id']);
    });
    if (this.webService.starships.length === 0) {
      const starshipUrl = this.starshipUrls.find(
        (x) => x.id === this.urlId
      ).url;
      this.webService.getStarship(starshipUrl).subscribe((resultObject) => {
        this.currentStarship = {
          image: `../assets/${this.urlId}.png`,
          name: resultObject.name,
          model: resultObject.model,
          manufacturer: resultObject.manufacturer,
          cost_in_credits: resultObject.cost_in_credits,
          length: resultObject.length,
          max_atmosphering_speed: resultObject.max_atmosphering_speed,
          crew: resultObject.crew,
          passengers: resultObject.passengers,
          cargo_capacity: resultObject.cargo_capacity,
          consumables: resultObject.consumables,
          hyperdrive_rating: resultObject.hyperdrive_rating,
          MGLT: resultObject.MGLT,
          starship_class: resultObject.starship_class,
          pilots: resultObject.pilots,
          films: resultObject.films,
          created: resultObject.created,
          edited: resultObject.edited,
          url: resultObject.url,
        };
      });
    }
    this.currentStarship =
      this.webService.starships[this.webService.currentIndex];

    this.getPilots();
  }
}
