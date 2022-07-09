import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Pilot } from '../interfaces/pilot';

@Component({
  selector: 'app-pilot-card',
  templateUrl: './pilot-card.component.html',
  styleUrls: ['./pilot-card.component.scss'],
})
export class PilotCardComponent implements OnInit {
  @Input() public pilot: Pilot = {
    birth_year: '',
    height: '',
    homeworld: '',
    mass: '',
    name: '',
    gender: '',
    eye_color: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
