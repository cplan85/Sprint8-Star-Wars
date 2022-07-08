import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isLoggedIn: boolean = false;

  constructor() {}

  logIn() {
    this.isLoggedIn = true;
  }

  logOut() {
    this.isLoggedIn = false;
  }
}
