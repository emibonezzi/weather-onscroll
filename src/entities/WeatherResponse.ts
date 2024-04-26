import { Day } from "./Day";

export interface WeatherResponse {
  cod: number;
  message: number;
  cnt: number;
  list: Day[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
