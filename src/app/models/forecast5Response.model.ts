import { City } from "./city.model"
import { Forecast } from "./forecast.model";

export interface Forecast5Response {
  list: Forecast[],
  city: City,
}