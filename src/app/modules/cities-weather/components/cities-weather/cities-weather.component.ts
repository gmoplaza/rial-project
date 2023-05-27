import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { debounceTime, Observable, of, startWith, switchMap } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { CitiesWeatherService } from 'src/app/services/cities-weather.service';
import { defaultCities } from '../../defaultCities';

@Component({
  selector: 'rial-cities-weather',
  templateUrl: './cities-weather.component.html',
  styleUrls: ['./cities-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesWeatherComponent implements OnInit {

  now = new Date();

  isSearchOpen = false;

  searchFormCtrl = new FormControl('');

  filteredCities$!: Observable<City[]>;

  selectedCityIndex: number = 0;

  // Injections
  private _citiesWeatherService = inject(CitiesWeatherService);

  ngOnInit() {
    this.filteredCities$ = this.searchFormCtrl.valueChanges.pipe(
      debounceTime(500),
      startWith(this.searchFormCtrl.value),
      switchMap((searchValue) => {
        if(!searchValue) return of(defaultCities);
        return this._citiesWeatherService.search(searchValue);
      }),
    );
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    const { index } = event;
    this.selectedCityIndex = index;
  }

  onToggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
}
