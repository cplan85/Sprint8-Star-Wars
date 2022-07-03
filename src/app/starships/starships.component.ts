import { CurrentStarshipService } from './../services/current-starship.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Starship } from '../interfaces/starship';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
})
export class StarshipsComponent implements OnInit {
  constructor(
    private webService: WebService,
    private router: Router,
    private currentStarshipService: CurrentStarshipService
  ) {}

  starships: Starship[] = [];

  getAllStarShips() {
    this.webService.getAllStarships().subscribe((resultObject) => {
      console.log(resultObject.results[0]);

      resultObject.results.forEach((starship, i) => {
        this.starships.push({
          image: `../assets/${i}.png`,
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          cost_in_credits: starship.cost_in_credits,
          length: starship.length,
          max_atmosphering_speed: starship.max_atmosphering_speed,
          crew: starship.crew,
          passengers: starship.passengers,
          cargo_capacity: starship.cargo_capacity,
          consumables: starship.consumables,
          hyperdrive_rating: starship.hyperdrive_rating,
          MGLT: starship.MGLT,
          starship_class: starship.starship_class,
          pilots: starship.pilots,
          films: starship.films,
          created: starship.created,
          edited: starship.edited,
          url: starship.url,
        });
      });

      this.webService.setNextApi(resultObject.next);
    });
  }

  getNextStarShips() {
    this.webService.getNextStarships().subscribe((resultObject) => {
      resultObject.results.forEach((starship, i) => {
        this.starships.push({
          image: `../assets/${this.starships.length + i}.png`,
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          cost_in_credits: starship.cost_in_credits,
          length: starship.length,
          max_atmosphering_speed: starship.max_atmosphering_speed,
          crew: starship.crew,
          passengers: starship.passengers,
          cargo_capacity: starship.cargo_capacity,
          consumables: starship.consumables,
          hyperdrive_rating: starship.hyperdrive_rating,
          MGLT: starship.MGLT,
          starship_class: starship.starship_class,
          pilots: starship.pilots,
          films: starship.films,
          created: starship.created,
          edited: starship.edited,
          url: starship.url,
        });
      });

      this.webService.setNextApi(resultObject.next);
    });
  }

  goToInfoPage(index: number) {
    this.router.navigate(['/starships/info'], {
      queryParams: {
        id: index,
      },
      queryParamsHandling: 'merge',
    });
  }

  navigateToStarship(index: number) {
    this.currentStarshipService.setCurrentStarship(this.starships[index]);
    this.router.navigate(['starships/info'], {
      queryParams: {
        id: index,
      },
      queryParamsHandling: 'merge',
    });
  }

  // goPaginasWeb() {
  //   this.budgetService.sendPageChangeEvent();
  //   this.router.navigate(['/home'], {
  //     queryParams: {
  //       numberoPaginas: this.budgetService.webpages,
  //       numeroIdiomas: this.budgetService.idiomas,
  //     },
  //     queryParamsHandling: 'merge',
  //   });
  // }

  ngOnInit(): void {
    this.getAllStarShips();
  }
}
