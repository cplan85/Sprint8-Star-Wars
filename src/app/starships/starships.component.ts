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
  constructor(private webService: WebService, private router: Router) {}

  starships: Starship[] = [];

  getAllStarShips() {
    this.webService.getAllStarships().subscribe((resultObject) => {
      console.log(resultObject.results[0]);

      resultObject.results.forEach((starship) => {
        this.starships.push({ name: starship.name, model: starship.model });
      });

      this.webService.setNextApi(resultObject.next);
    });
  }

  getNextStarShips() {
    this.webService.getNextStarships().subscribe((resultObject) => {
      resultObject.results.forEach((starship) => {
        this.starships.push({ name: starship.name, model: starship.model });
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
