import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Starship } from '../interfaces/starship';
import { GetRequest } from '../interfaces/getRequest';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  starships: Starship[] = [];
  currentIndex: number = 0;

  private next: string = '';
  private api = 'https://swapi.dev/api';
  constructor(private http: HttpClient) {}

  getAllStarships() {
    const path = `${this.api}/starships`;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }

  getStarship(fullUrl: string) {
    return this.http.get<Starship>(fullUrl).pipe(delay(1000));
  }

  setStarShips(starships: Starship[]) {
    this.starships = starships;
  }

  getPilot(path: string) {
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }

  setNextApi(url: string) {
    this.next = url;
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  getNextStarships() {
    const path = this.next;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }

  // getStarship(id: string) {
  //   const path = `${this.api}/starships/${id}`;
  //   return this.http.get<Starship[]>(path);
  // }

  createTask(task: Starship) {
    const path = `${this.api}/todos/`;
    return this.http.post<Starship[]>(path, task);
  }
}
