import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { City } from '../models/city.model';
import { Forecast5Response } from '../models/forecast5Response.model';

@Injectable()
export class CitiesWeatherService {

  private apiKey = 'fff29ebf8ee3aa62782e61a8b63a346b';

  private citiesMap = new Map<string, { id: string, name: string}>();

  constructor(
    private _http: HttpClient,
  ) {}

  getCityForecast5(cityId: number): Observable<Forecast5Response> {
    const forecast5Url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${this.apiKey}`;
    return this._http.get<Forecast5Response>(forecast5Url).pipe(
      tap(data => console.log('Getting data from', data.city.name))
    );
  }

  // In a real case, this method only return the cities filtered in the server
  search(searchValue: string): Observable<City[]> {
    if (this.citiesMap.size) return of(this.getFilterCities(searchValue));

    return this.populateCitiesMap().pipe(
      map(() => this.getFilterCities(searchValue))
    )
    
  }

  private populateCitiesMap(): Observable<true> {
    return this._http.get('assets/cities_20000.csv', {responseType: 'text'}).pipe(
      map(((value) => value.split('\n'))),
      map(value => value.slice(1)),
      map(rows => rows.map((row) => {
        const [id, name] = row.split(',');
        const city = {
          id,
          name,
        };
        return city;
      })),
      map((cities) => {
        cities.forEach((city) => {
          if(!city?.name) {
            return;
          }
          this.citiesMap.set(city.name, city);
        })
        return true;
      })
    )
  }

  private getFilterCities(search: string) {
    const searchValue = search.toLowerCase();
    const maxResult = 10;
    return Array.from(this.citiesMap.entries()).reduce((accumulator, [name, city]) => {
      if (maxResult <= accumulator.length) return accumulator;
      if (maxResult > accumulator.length && name.toLowerCase().includes(searchValue)) accumulator.push(city as never);
      return accumulator;
    },
      [],
    );
  }
}
