import { ForecastMain } from "./forecastMain.model"
import { ForecastWeather } from "./forecastWeather.model"

export interface Forecast {
  dt: number,
  main: ForecastMain,
  weather: ForecastWeather[],
}
