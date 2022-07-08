import { WebService } from './../services/web.service';
//import { CurrentStarshipService } from './../services/current-starship.service';
import { Component, OnInit } from '@angular/core';
import { Starship } from '../interfaces/starship';
import { ActivatedRoute } from '@angular/router';

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

  getPilots() {
    this.currentStarship.pilots?.forEach((pilot) => {
      this.webService.getPilot(pilot).subscribe((resultObject) => {
        console.log(resultObject);
        this.pilots.push(resultObject);
      });
    });
  }
  constructor(private webService: WebService, private route: ActivatedRoute) {}

  //have to create component
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
    });
    //if webService.starships.length === 0 do this
    this.currentStarship =
      this.webService.starships[this.webService.currentIndex];

    this.getPilots();
  }
}
