import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { useDarkMode } from "./hooks/useDarkMode";
import { useAuth } from "./hooks/useAuth";
import { useFavorites } from "./hooks/useFavorites";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import AISuggestionCard from "./components/AISuggestionCard";
import AirQualityCard from "./components/AirQualityCard";
import HourlyForecastCard from "./components/HourlyForecastCard";
import DailyForecastCard from "./components/DailyForecastCard";
import SearchBar from "./components/SearchBar";
import AuthModal from "./components/AuthModal";
import FavoritesPanel from "./components/FavoritesPanel";

export default function App() {
  const {
    user,
    login,
    register,
    logout,
    loading: authLoading,
    error: authError,
    getToken,
  } = useAuth();

  const { data, loading, error, searchByCity, retryGPS, refresh, lastUpdated } =
    useWeather();

  const { isDark, toggleDark } = useDarkMode();

  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavorites(getToken());

  const [isCelsius, setIsCelsius] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);

  const handleAddFavorite = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (!data) return;
    try {
      setFavoriteError(null);
      await addFavorite(
        data.location.city,
        data.lat,
        data.lon,
        data.location.country,
      );
    } catch (err: any) {
      setFavoriteError(err.message);
      setTimeout(() => setFavoriteError(null), 3000);
    }
  };

  const handleSelectFavorite = (city: string) => {
    searchByCity(city);
    setShowFavorites(false);
  };

  const textPrimary = isDark ? "text-white" : "text-gray-800";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const btnClass = isDark
    ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
    : "bg-white hover:bg-gray-50 border-gray-200";

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 to-slate-800"
          : "bg-gradient-to-br from-slate-100 to-blue-100"
      }`}
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-xl md:text-2xl font-bold ${textPrimary}`}>
              ⛅ Weather AI
            </h1>
            <p className={`text-xs md:text-sm ${textSecondary}`}>
              {user ? `Hello, ${user.name} 👋` : "Powered by AI"}
            </p>
          </div>
          <div className="flex gap-2">
            {/* Favorites */}
            <button
              onClick={() =>
                user ? setShowFavorites(!showFavorites) : setShowAuth(true)
              }
              className={`w-10 h-10 flex items-center justify-center 
                rounded-2xl border shadow-sm transition text-lg ${btnClass}`}
              title="Favorites"
            >
              ⭐
            </button>

            {/* Login / Logout */}
            <button
              onClick={() => (user ? logout() : setShowAuth(true))}
              className={`px-3 h-10 flex items-center justify-center 
                rounded-2xl border shadow-sm transition text-sm font-semibold
                ${isDark ? `${btnClass} text-white` : `${btnClass} text-gray-700`}`}
            >
              {user ? "Logout" : "Login"}
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDark}
              title={isDark ? "Switch to light" : "Switch to dark"}
              className={`w-10 h-10 flex items-center justify-center 
                rounded-2xl border shadow-sm transition text-lg ${btnClass}`}
            >
              {isDark ? "🌙" : "☀️"}
            </button>

            {/* Refresh */}
            {data && (
              <button
                onClick={refresh}
                className={`w-10 h-10 flex items-center justify-center 
                  rounded-2xl border shadow-sm transition text-lg ${btnClass}`}
              >
                🔄
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <SearchBar
          onSearch={searchByCity}
          onRetryGPS={retryGPS}
          isDark={isDark}
        />

        {/* Favorites Panel */}
        {showFavorites && (
          <FavoritesPanel
            favorites={favorites}
            onSelect={handleSelectFavorite}
            onRemove={removeFavorite}
            isDark={isDark}
          />
        )}

        {/* Favorite Error */}
        {favoriteError && (
          <div className="bg-orange-100 text-orange-600 rounded-2xl p-3 text-sm text-center">
            {favoriteError}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4 animate-bounce">🌤️</div>
            <p className={`text-xl font-semibold ${textPrimary}`}>
              Getting your weather...
            </p>
            <p className={`text-sm mt-2 ${textSecondary}`}>
              Please allow location access
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div
            className={`border rounded-3xl p-6 text-center ${
              isDark
                ? "bg-red-900/30 border-red-700"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-4xl mb-3">😕</p>
            <p
              className={`font-semibold ${isDark ? "text-red-400" : "text-red-600"}`}
            >
              {error}
            </p>
            <p className={`text-sm mt-2 ${textSecondary}`}>
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
              onAddFavorite={handleAddFavorite}
              isFavorite={isFavorite(data.location.city)}
              isLoggedIn={!!user}
            />
            <AISuggestionCard
              suggestion={data.aiSuggestion}
              bestTime={data.current.bestTimeOutside}
            />
            <AirQualityCard airQuality={data.airQuality} />
            <HourlyForecastCard
              hourly={data.hourly}
              isCelsius={isCelsius}
              isDark={isDark}
            />
            <DailyForecastCard
              daily={data.daily}
              isCelsius={isCelsius}
              isDark={isDark}
            />
          </>
        )}

        {/* Footer */}
        <p className={`text-center text-xs pb-4 ${textSecondary}`}>
          Weather data from Open-Meteo • Air quality from Open-Meteo AQI
          {lastUpdated && ` • Updated ${lastUpdated}`}
        </p>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          isDark={isDark}
          onLogin={login}
          onRegister={register}
          loading={authLoading}
          error={authError}
        />
      )}
    </div>
  );
}
