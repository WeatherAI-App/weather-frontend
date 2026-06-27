import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API } from "../config/api";

interface CityResult {
  displayName: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

interface Props {
  onSearch: (city: string) => void;
  onSearchByCoords: (lat: number, lon: number, cityName?: string) => void;
  onRetryGPS: () => void;
  isDark: boolean;
}

export default function SearchBar({
  onSearch,
  onSearchByCoords,
  onRetryGPS,
  isDark,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const suppressNextFetchRef = useRef(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (suppressNextFetchRef.current) {
        suppressNextFetchRef.current = false;
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          `${API.WEATHER}/autocomplete?city=${encodeURIComponent(query)}`,
        );
        setResults(response.data);
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelect = (result: CityResult) => {
    suppressNextFetchRef.current = true;
    setQuery(result.city);
    setShowDropdown(false);
    setResults([]);
    onSearchByCoords(result.lat, result.lon, result.city);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      setShowDropdown(false);
      setResults([]);
      onSearch(query.trim());
    }
  };

  const inputBg = isDark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
    : "bg-white border-gray-200 text-gray-800 placeholder-gray-400";

  const dropdownBg = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const itemHover = isDark ? "hover:bg-gray-700" : "hover:bg-gray-50";
  const cityText = isDark ? "text-white" : "text-gray-800";
  const countryText = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex gap-2">
        {/* Search input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            placeholder="Search city... (e.g. Tokyo, London)"
            className={`w-full px-4 py-3 rounded-2xl border shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              transition ${inputBg}`}
          />
          {/* Loading spinner */}
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          onClick={() => {
            if (!query.trim()) return;
            setShowDropdown(false);
            setResults([]);
            onSearch(query.trim());
          }}
          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white
                     rounded-2xl shadow-sm transition font-medium"
        >
          🔍
        </button>

        {/* GPS button */}
        <button
          onClick={onRetryGPS}
          className={`px-4 py-3 rounded-2xl shadow-sm transition
            ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
            }`}
        >
          📍
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && results.length > 0 && (
        <div
          className={`absolute top-full left-0 right-0 mt-2 rounded-2xl 
          border shadow-xl z-50 overflow-hidden ${dropdownBg}`}
        >
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelect(result)}
              className={`w-full px-4 py-3 text-left transition flex items-center gap-3
                ${itemHover} ${
                  index !== results.length - 1
                    ? isDark
                      ? "border-b border-gray-700"
                      : "border-b border-gray-100"
                    : ""
                }`}
            >
              <span className="text-lg">📍</span>
              <div>
                <p className={`font-semibold text-sm ${cityText}`}>
                  {result.city}
                </p>
                <p className={`text-xs ${countryText}`}>{result.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
