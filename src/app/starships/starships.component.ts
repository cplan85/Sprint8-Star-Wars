import { CurrentStarshipService } from './../services/current-starship.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { WebService } from '../services/web.service';
import { Starship } from '../interfaces/starship';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QueryList } from '@angular/core';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
})
export class StarshipsComponent implements OnInit, AfterViewInit {

  @ViewChildren("theLastList", {read: ElementRef})
  theLastList: QueryList<ElementRef>;
  observer: any;

  constructor(
    private webService: WebService,
    private router: Router,
    private currentStarshipService: CurrentStarshipService,
    private spinner: NgxSpinnerService
  ) {}
  
  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      if (d.last) this.observer.observe(d.last.nativeElement)
    })
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
    
    this.observer = new IntersectionObserver( (entries)=> {
      if(entries[0].isIntersecting) {
       // console.log("scroll more")
       if(this.starships.length < 35) {
        this.getNextStarShips()}
      }
    }, options);
  }

  starships: Starship[] = [];
  starshipUrls: any[] = [];
  backupUrl = `../../assets/placeholder-img.jpg`;

  pushStarShips(starship: Starship, url: string) {
    this.starships.push({
      image: url,
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
  }
  getAllStarShips() {
    if (this.webService.starships.length === 0) {
      this.spinner.show();
      this.webService.getAllStarships().subscribe((resultObject) => {
        this.spinner.hide();
        resultObject.results.forEach((starship, i) => {
          this.pushStarShips(starship, `../assets/${i}.png`);
        });
        this.webService.setNextApi(resultObject.next);
      });
      this.webService.setStarShips(this.starships);
    } else {
      this.starships = this.webService.starships;
    }
    console.log(this.starships);
  }

  getNextStarShips() {
    this.spinner.show();
    this.webService.getNextStarships().subscribe((resultObject) => {
      this.spinner.hide();
      const arrLength = this.starships.length;
      resultObject.results.forEach((starship, i) => {
        this.pushStarShips(starship, `../assets/${arrLength + i}.png`);
        this.starshipUrls.push({ id: arrLength + i, url: starship.url });
      });
      console.log(this.starshipUrls, 'URLS');
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
    this.webService.setCurrentIndex(index);
  }

  ngOnInit(): void {
    this.getAllStarShips();
    this.intersectionObserver();
  }
}
