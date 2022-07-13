import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentURL = window.location.href;
  starShipActive: boolean = false;
  homeActive: boolean = false;

  constructor(public router: Router,
    public usersService: UsersService) {}

  setStarShipActive() {
    this.starShipActive = true;
    this.homeActive = false;
  }

  setHomeActive() {
    this.starShipActive = false;
    this.homeActive = true;
  }

  logout() {
    this.usersService.logOut().subscribe((res) => {
      if (!this.usersService.isLoggedIn) {
        const redirect = this.usersService.redirectUrl
          ? this.router.parseUrl('/')
          : 'logout';

        this.router.navigateByUrl('/');
      }
    });
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
