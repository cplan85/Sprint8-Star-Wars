import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentURL = window.location.href;
  starShipActive: boolean = false;
  homeActive: boolean = false;

  constructor(public router: Router) {}

  setStarShipActive() {
    this.starShipActive = true;
    this.homeActive = false;
  }

  setHomeActive() {
    this.starShipActive = false;
    this.homeActive = true;
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.homeActive = true;
    }
    if (this.currentURL.includes('starships')) {
      this.starShipActive = true;
      this.homeActive = false;
    }
  }
}
