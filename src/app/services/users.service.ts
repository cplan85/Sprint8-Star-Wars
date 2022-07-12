import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '/starships';
  currentUser: User = {
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    getNewsletter: false, 
  };

  constructor() {}

  logIn(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap((val) => (this.isLoggedIn = true))
    );
  }

  logOut(): Observable<boolean> {
    return of(false).pipe(
      delay(500),
      tap((val) => (this.isLoggedIn = false))
    );
  }

  setCurrentUser(user: User) {
    this.currentUser = user
  }
}
