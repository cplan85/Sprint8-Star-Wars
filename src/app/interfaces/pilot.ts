export interface Pilot {
  birth_year: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  gender: string;
  eye_color: string;
  films?: string[];
  created?: string;
  edited?: string;
  hair_color?: string;
  skin_color?: string;
  species?: Array<string>;
  starships?: Array<string>;
  url?: string;
}
