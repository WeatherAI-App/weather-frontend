import type { CurrentWeather, LocationData } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface Props {
  current: CurrentWeather;
  location: LocationData;
  isCelsius: boolean;
  onToggleUnit: () => void;
}

const toF = (c: number) => Math.round(c * 9 / 5 + 32);

export default function CurrentWeatherCard({ current, location, isCelsius, onToggleUnit }: Props) {
  const temp = isCelsius ? current.temp : toF(current.temp);
  const feelsLike = isCelsius ? current.feelsLike : toF(current.feelsLike);
  const unit = isCelsius ? "°C" : "°F";

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-5 md:p-6 text-white shadow-xl">

      {/* Location */}
      <div className="mb-4">
        <p className="text-blue-200 text-xs md:text-sm truncate">
          📍 {location.road && `${location.road}, `}{location.district}
        </p>
        <h1 className="text-xl md:text-2xl font-bold truncate">
          {location.city}, {location.country}
        </h1>
      </div>

      {/* Main temp */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-end gap-1">
            <span className="text-6xl md:text-7xl font-thin">{Math.round(temp)}</span>
            <span className="text-2xl md:text-3xl mb-2">{unit}</span>
          </div>
          <p className="text-blue-200">{current.condition}</p>
          <p className="text-blue-200 text-sm">Feels like {Math.round(feelsLike)}{unit}</p>
        </div>
        <WeatherIcon condition={current.condition} size="text-6xl md:text-8xl" />
      </div>

      {/* Toggle unit */}
      <button
        onClick={onToggleUnit}
        className="mb-4 bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-sm transition"
      >
        Switch to {isCelsius ? "°F" : "°C"}
      </button>

      {/* Stats grid — 2 cols on mobile, 3 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-xl md:text-2xl">💧</p>
          <p className="text-base md:text-lg font-semibold">{current.humidity}%</p>
          <p className="text-blue-200 text-xs">Humidity</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-xl md:text-2xl">💨</p>
          <p className="text-base md:text-lg font-semibold">{current.windSpeed} km/h</p>
          <p className="text-blue-200 text-xs">Wind {current.windDirection}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-xl md:text-2xl">🌧️</p>
          <p className="text-base md:text-lg font-semibold">{current.rainProbability}%</p>
          <p className="text-blue-200 text-xs">Rain</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-xl md:text-2xl">🔆</p>
          <p className="text-base md:text-lg font-semibold">{current.uvIndex}</p>
          <p className="text-blue-200 text-xs">UV Index</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-xl md:text-2xl">👁️</p>
          <p className="text-base md:text-lg font-semibold">{current.visibility.toFixed(1)} km</p>
          <p className="text-blue-200 text-xs">Visibility</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3 text-center">
          <p className="text-xl md:text-2xl">🌅</p>
          <p className="text-base md:text-lg font-semibold">{current.sunrise}</p>
          <p className="text-blue-200 text-xs">Sunrise</p>
        </div>
      </div>
    </div>
  );
}