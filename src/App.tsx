import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { useDarkMode } from "./hooks/useDarkMode";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import AISuggestionCard from "./components/AISuggestionCard";
import AirQualityCard from "./components/AirQualityCard";
import HourlyForecastCard from "./components/HourlyForecastCard";
import DailyForecastCard from "./components/DailyForecastCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const { data, loading, error, searchByCity, retryGPS, refresh, lastUpdated } = useWeather();
  const { isDark, toggleDark } = useDarkMode();
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300
      ${isDark
        ? "bg-gradient-to-br from-gray-900 to-slate-800"
        : "bg-gradient-to-br from-slate-100 to-blue-100"
      }`}
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-xl md:text-2xl font-bold 
              ${isDark ? "text-white" : "text-gray-800"}`}>
              ⛅ Weather AI
            </h1>
            <p className={`text-xs md:text-sm 
              ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Powered by AI
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleDark}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`w-10 h-10 flex items-center justify-center rounded-2xl 
                border shadow-sm transition text-lg
                ${isDark
                  ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                  : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
            >
              {isDark ? "🌙" : "☀️"}
            </button>
            {data && (
              <button
                onClick={refresh}
                className={`w-10 h-10 flex items-center justify-center rounded-2xl 
                  border shadow-sm transition text-lg
                  ${isDark
                    ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
              >
                🔄
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={searchByCity} onRetryGPS={retryGPS} isDark={isDark} />

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4 animate-bounce">🌤️</div>
            <p className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-600"}`}>
              Getting your weather...
            </p>
            <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-400"}`}>
              Please allow location access
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className={`border rounded-3xl p-6 text-center
            ${isDark
              ? "bg-red-900/30 border-red-700"
              : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-4xl mb-3">😕</p>
            <p className={`font-semibold ${isDark ? "text-red-400" : "text-red-600"}`}>
              {error}
            </p>
            <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
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
            <HourlyForecastCard hourly={data.hourly} isCelsius={isCelsius} isDark={isDark} />
            <DailyForecastCard daily={data.daily} isCelsius={isCelsius} isDark={isDark} />
          </>
        )}

        {/* Footer */}
        <p className={`text-center text-xs pb-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          Weather data from Open-Meteo • Air quality from Open-Meteo AQI
          {lastUpdated && ` • Updated ${lastUpdated}`}
        </p>

      </div>
    </div>
  );
}