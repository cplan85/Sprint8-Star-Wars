import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '';

  constructor() {}

  logIn(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap((val) => (this.isLoggedIn = true))
    );
  }

  logOut() {
    this.isLoggedIn = false;
  }
}
