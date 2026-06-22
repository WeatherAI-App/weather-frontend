import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import AISuggestionCard from "./components/AISuggestionCard";
import AirQualityCard from "./components/AirQualityCard";
import HourlyForecastCard from "./components/HourlyForecastCard";
import DailyForecastCard from "./components/DailyForecastCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const { data, loading, error, searchByCity, retryGPS } = useWeather();
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">

        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">⛅ Weather AI</h1>
          <p className="text-gray-500 text-sm">Powered by AI</p>
        </div>

        {/* Search Bar — always visible */}
        <SearchBar onSearch={searchByCity} onRetryGPS={retryGPS} />

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <div className="text-6xl mb-4 animate-bounce">🌤️</div>
            <p className="text-xl font-semibold">Getting your weather...</p>
            <p className="text-gray-400 text-sm mt-2">Please allow location access</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
            <p className="text-4xl mb-3">😕</p>
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-gray-500 text-sm mt-2">
              Try searching for a city above
            </p>
          </div>
        )}

        {/* Weather Data */}
        {!loading && !error && data && (
          <>
            <CurrentWeatherCard
              current={data.current}
              location={data.location}
              isCelsius={isCelsius}
              onToggleUnit={() => setIsCelsius(!isCelsius)}
            />
            <AISuggestionCard
              suggestion={data.aiSuggestion}
              bestTime={data.current.bestTimeOutside}
            />
            <AirQualityCard airQuality={data.airQuality} />
            <HourlyForecastCard hourly={data.hourly} isCelsius={isCelsius} />
            <DailyForecastCard daily={data.daily} isCelsius={isCelsius} />
          </>
        )}

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs pb-4">
          Weather data from Open-Meteo • Air quality from Open-Meteo AQI
        </p>

      </div>
    </div>
  );
}