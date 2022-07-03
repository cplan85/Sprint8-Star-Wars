import { Injectable } from '@angular/core';
import { Starship } from '../interfaces/starship';

@Injectable({
  providedIn: 'root',
})
export class CurrentStarshipService {
  currentStarship: Starship = {
    image: ``,
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: 0,
    length: '',
    max_atmosphering_speed: '',
    crew: '',
    passengers: 0,
    cargo_capacity: 0,
    consumables: '',
    hyperdrive_rating: '',
    MGLT: '',
    starship_class: '',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: '',
  };
  constructor() {}

  setCurrentStarship(starship: Starship) {
    this.currentStarship = starship;
  }
}
