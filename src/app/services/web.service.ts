import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Starship } from '../interfaces/starship';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private api = 'http https://swapi.dev/api';
  constructor(private http: HttpClient) {}

  getAllStarships() {
    const path = `${this.api}/starships`;
    return this.http.get<Starship[]>(path);
  }

  getStarship(id: string) {
    const path = `${this.api}/starships/${id}`;
    return this.http.get<Starship[]>(path);
  }

  createTask(task: Starship) {
    const path = `${this.api}/todos/`;
    return this.http.post<Starship[]>(path, task);
  }

  updateTask(task: Starship) {
    const path = `${this.api}/todos/${task.id}`;
    return this.http.put<Starship[]>(path, task);
  }

  deleteTask(id: Starship) {
    const path = `${this.api}/todos/${id}`;
    return this.http.delete(path);
  }
}
