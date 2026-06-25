import type { FavoriteLocation } from "../types/weather";

interface Props {
  favorites: FavoriteLocation[];
  onSelect: (city: string) => void;
  onRemove: (id: string) => void;
  isDark: boolean;
}

export default function FavoritesPanel({
  favorites,
  onSelect,
  onRemove,
  isDark,
}: Props) {
  if (favorites.length === 0) {
    return (
      <div
        className={`rounded-3xl p-4 text-center
        ${isDark ? "bg-gray-800 text-gray-400" : "bg-white text-gray-400"}`}
      >
        <p className="text-2xl mb-2">📍</p>
        <p className="text-sm">No favorite locations yet</p>
        <p className="text-xs mt-1">Search a city and save it!</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl p-4 shadow-xl
      ${isDark ? "bg-gray-800" : "bg-white"}`}
    >
      <h2
        className={`font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}
      >
        ⭐ Favorite Locations
      </h2>
      <div className="flex flex-col gap-2">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className={`flex items-center justify-between rounded-2xl px-4 py-3
              ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
          >
            <button
              onClick={() => onSelect(fav.cityName)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              <span className="text-lg">📍</span>
              <div>
                <p
                  className={`font-semibold text-sm
                  ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  {fav.cityName}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {fav.country}
                </p>
              </div>
            </button>
            <button
              onClick={() => onRemove(fav.id)}
              className="text-red-400 hover:text-red-600 ml-2 text-lg"
              title="Remove from favorites"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
