import { City } from "./city.model"
import { Main } from "./main.model"
import { Weather } from "./weather.model"
import { Wind } from "./wind.model"

export interface Forecast {
  dt: number,
  main: Main,
  weather: Weather[],
  clouds: {
    all: number
  },
  wind: Wind,
  visibility: 8744,
  pop: 1,
  snow: {
    "3h": 0.4
  },
  sys: {
    pod: "d"
  },
  dt_txt: "2022-12-22 06:00:00"
}

export interface Forecast5Response {
  cod: string,
  message: number,
  cnt: number,
  list: Forecast[],
  city: City,
}