import { Starship } from './starship';
export interface GetRequest {
  count: number;
  next: 'string';
  previous: string | null;
  results: Starship[];
}
