import { Route } from '@angular/router';
import { CitiesWeatherComponent } from './components/cities-weather/cities-weather.component';

export const CitiesWeatherRoutes: Route[] = [
  {
    path: '',
    component: CitiesWeatherComponent,
  },
];
