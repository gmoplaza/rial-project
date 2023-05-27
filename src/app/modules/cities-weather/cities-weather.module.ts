import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CitiesWeatherComponent } from './components/cities-weather/cities-weather.component';
import { RouterModule } from '@angular/router';
import { CitiesWeatherRoutes } from './cities-weather.routes';
import { CitiesWeatherService } from 'src/app/services/cities-weather.service';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';

@NgModule({
  declarations: [
    CitiesWeatherComponent,
    CityForecastComponent,
  ],
  exports: [
    CitiesWeatherComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(CitiesWeatherRoutes),
    
    // Standalone components
    MainHeaderComponent,
  ],
  providers: [
    CitiesWeatherService,
  ],
})
/**
 * Clarification 
 * This application does not really need the use of another module, it is only being done to show a possible optimization
 * if this were a larger application and was divided into several modules
 */
export class CitiesWeatherModule { }
