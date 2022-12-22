import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CitiesWeatherRoutes } from './cities-weather.routes';
import { CitiesWeatherComponent } from './components/cities-weather/cities-weather.component';

@NgModule({
  imports: [
    RouterModule.forChild(CitiesWeatherRoutes),
  ],
  declarations: [
    CitiesWeatherComponent,
  ],
})

export class CitiesWeatherModule { }
