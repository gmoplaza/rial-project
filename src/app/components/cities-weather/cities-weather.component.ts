import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { debounceTime, of, Subscription, switchMap } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { CitiesWeatherService } from 'src/app/services/cities-weather.service';

@Component({
  selector: 'app-cities-weather',
  templateUrl: './cities-weather.component.html',
  styleUrls: ['./cities-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesWeatherComponent implements OnInit, OnDestroy {

  private _subcriptions = new Subscription();

  now = new Date();

  isSearchOpen = false;

  searchFormCtrl = new FormControl('');

  defaultCities = [
    {
      name: 'Rio de Janeiro',
      id: 3451190,
    },
    {
      name: 'Beijing',
      id: 1816670,
    },
    {
      name: 'Los Angeles',
      id: 5368361,
    },
    {
      name: 'Santiago',
      id: 3871336,
    }
  ] as City[];

  cities = [] as City[];

  selectedCityId: number = this.defaultCities[0].id;

  constructor(
    private _citiesWeatherService: CitiesWeatherService,
    private _cdr: ChangeDetectorRef,
  ) {
    this.cities = [...this.defaultCities];
  }

  ngOnInit() {
    const sub = this.searchFormCtrl.valueChanges.pipe(
      debounceTime(500),
      switchMap((searchValue) => {
        if(!searchValue) return of(this.defaultCities);
        return this._citiesWeatherService.search(searchValue);
      }),
    ).subscribe((cities) => {
      this.cities = [...cities];
      const [firstCity] = this.cities;
      this.selectedCityId = firstCity?.id;
      this._cdr.markForCheck();
    });
    this._subcriptions.add(sub);
  }
  ngOnDestroy() {
    this._subcriptions.unsubscribe();
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    const { index } = event;
    const selectedCity = this.cities[index]
    this.selectedCityId = selectedCity?.id;
  }

  onToggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
}
