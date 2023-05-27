import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay, switchMap } from 'rxjs';
import { Forecast5Response } from 'src/app/models/forecast5Response.model';
import { CitiesWeatherService } from 'src/app/services/cities-weather.service';
import { NextDaysData } from '../models/nextDaysData.model';
import { NextHoursData } from '../models/nextHoursData.model';

@Component({
  selector: 'rial-city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityForecastComponent {

  private cityForecast$ = new BehaviorSubject<number>(NaN);

  nextDays = 5;

  nextHoursData$!: Observable<NextHoursData[]>;

  nextDaysData$!: Observable<NextDaysData[]>;

  // Injections
  _citiesWeatherService = inject(CitiesWeatherService);

  @Input()
  set cityId(id: number) {
    if (isNaN(id)) return;
    this.cityForecast$.next(id);
  }

  constructor() {
    this.subscribeToData();
  }

  private subscribeToData() {
    const forecastData$ = this.cityForecast$.pipe(
      switchMap((id) => this._citiesWeatherService.getCityForecast5(id)),
      shareReplay(1),
    );
    this.nextHoursData$ = forecastData$.pipe(
      map(data => this.parseHoursData(data)),
    );
    this.nextDaysData$ = forecastData$.pipe(
      map(data => this.parseNextDaysData(data)),
    );
  }

  private parseHoursData(data: Forecast5Response): NextHoursData[] {
    const { list: forecastData } = data;
    if (!forecastData?.length) return[];

    // Get the next hours information
    return forecastData.slice(0, 4).map((data) => {
      const { main, dt, weather } = data;
      const { temp, humidity } = main;
      const [{ icon }] = weather;
      const iconUrl = this.getIcon(icon);
      return {
        temp,
        humidity,
        icon: iconUrl,
        dt: new Date(dt * 1000),
      }
    });
  }

  private parseNextDaysData(data: Forecast5Response): NextDaysData[] {
    const { list: forecastData } = data;
    if (!forecastData?.length) return[];

    // The API return the data in 3 hours steps
    // 24 hours / 3 hours = 8
    const nextDays = [];
    for (let index = 8; index < forecastData.length; index = index + 8 ) {
      const dayI = forecastData[index];
      const { main, dt, weather } = dayI;
      const { temp_min, temp_max } = main;
      const [{ icon, description }] = weather;
      const iconUrl = this.getIcon(icon);
      const day = {
        icon: iconUrl,
        dt: new Date(dt * 1000),
        description,
        temp_min,
        temp_max,
      }
      nextDays.push(day);
    }
    return [...nextDays];
  }

  private getIcon(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

}
