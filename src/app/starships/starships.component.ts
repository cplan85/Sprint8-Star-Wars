import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Starship } from '../interfaces/starship';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
})
export class StarshipsComponent implements OnInit {
  constructor(private webService: WebService) {}

  starships: Starship[] = [];

  getAllStarShips() {
    this.webService.getAllStarships().subscribe((resultObject) => {
      console.log(resultObject);

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

  ngOnInit(): void {
    this.getAllStarShips();
  }
}
