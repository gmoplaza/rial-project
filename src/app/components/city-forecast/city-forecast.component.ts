import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Forecast5Response } from 'src/app/models/forecast5Response.model';
import { CitiesWeatherService } from 'src/app/services/cities-weather.service';

export interface NextHoursData {
  temp: number,
  humidity: number,
  icon: string,
  dt: Date,
}

export interface NextDaysData {
  icon: string,
  dt: Date,
  description: string,
  temp_min: number,
  temp_max: number,
}

@Component({
  selector: 'app-city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityForecastComponent {

  private _subscription = new Subscription();

  nextDays = 5;

  forecast5!: Forecast5Response;

  nextHoursData: NextHoursData[] = [];

  nextDaysData: NextDaysData[] = [];

  constructor(
    private _citiesWeatherService: CitiesWeatherService,
    private _cdr: ChangeDetectorRef,
  ) {}

  @Input()
  set cityId (cityId: number) {
    if (!cityId) return;

    const sub = this._citiesWeatherService.getCityForecast5(cityId).subscribe((data) => {
      this._subscription.remove(sub);
      this.parseWeatherData(data);
      this._cdr.markForCheck();
    });
    this._subscription.add(sub);
  }

  private parseWeatherData(data: Forecast5Response) {
    const { list: forecastData } = data;
    if (!forecastData?.length) return;

    // Get the next hours information
    this.nextHoursData = forecastData.slice(0, 4).map((data) => {
      const { main, dt, weather } = data;
      const { temp, humidity } = main;
      const [{ icon }] = weather;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      return {
        temp,
        humidity,
        icon: iconUrl,
        dt: new Date(dt * 1000),
      }
    });

    // The API return the data in 3 hours steps
    // 24 hours / 3 hours = 8
    const nextDays = [];
    for (let index = 8; index < forecastData.length; index = index + 8 ) {
      const dayI = forecastData[index];
      const { main, dt, weather } = dayI;
      const { temp_min, temp_max } = main;
      const [{ icon, description }] = weather;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const day = {
        icon: iconUrl,
        dt: new Date(dt * 1000),
        description,
        temp_min,
        temp_max,
      }
      nextDays.push(day);
    }
    this.nextDaysData = [...nextDays];
  }

}
