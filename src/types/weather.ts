export interface LocationData {
  road: string;
  district: string;
  city: string;
  country: string;
  displayName: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
  windDirection: string;
  rainProbability: number;
  visibility: number;
  condition: string;
  weatherCode: number;
  sunrise: string;
  sunset: string;
  bestTimeOutside: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  rainProbability: number;
  uvIndex: number;
  condition: string;
  sunrise: string;
  sunset: string;
}

export interface AirQuality {
  aqi: number;
  level: string;
  advice: string;
}

export interface WeatherResponse {
  location: LocationData;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  airQuality: AirQuality;
  aiSuggestion: string;
  lat: number;
  lon: number;
  timezone: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  preferredUnit: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface FavoriteLocation {
  id: string;
  cityName: string;
  country: string;
  lat: number;
  lon: number;
  createdAt: string;
}