import { Route } from '@angular/router';

// This app doesn't need route handling, it's just put in to show lazy loading, which in a larger app makes sense to decrease the load size.
export const AppRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./modules/cities-weather/cities-weather.module').then(m => m.CitiesWeatherModule),
  },
  // Any route that is put will redirect to the correct module
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
