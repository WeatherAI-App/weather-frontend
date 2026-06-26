import { useState, useEffect } from "react";
import axios from "axios";
import type { WeatherResponse } from "../types/weather";
import { API } from "../config/api";

const API_BASE = API.WEATHER;
const LAST_CITY_KEY = "weatherai_last_city";
const LAST_DATA_KEY = "weatherai_last_data";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// ── Cache helpers ─────────────────────────────────
const saveToCache = (weatherData: WeatherResponse) => {
  localStorage.setItem(LAST_DATA_KEY, JSON.stringify({
    data: weatherData,
    timestamp: Date.now()
  }));
};

const loadFromCache = (): WeatherResponse | null => {
  try {
    const cached = localStorage.getItem(LAST_DATA_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) return data;
    return null;
  } catch {
    return null;
  }
};

// ── Hook ──────────────────────────────────────────
export const useWeather = () => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/forecast`, {
        params: { lat, lon }
      });
      setData(response.data);
      saveToCache(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
      localStorage.removeItem(LAST_CITY_KEY);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/search`, {
        params: { city }
      });
      setData(response.data);
      saveToCache(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
      localStorage.setItem(LAST_CITY_KEY, city);
    } catch (err) {
      setError(`City "${city}" not found. Please try another name.`);
    } finally {
      setLoading(false);
    }
  };

  const searchByCity = (city: string) => fetchByCity(city);

  const refresh = () => {
    localStorage.removeItem(LAST_DATA_KEY);
    const lastCity = localStorage.getItem(LAST_CITY_KEY);
    if (lastCity) {
      fetchByCity(lastCity);
    } else {
      getGPSLocation();
    }
  };

  const retryGPS = () => {
    localStorage.removeItem(LAST_CITY_KEY);
    localStorage.removeItem(LAST_DATA_KEY);
    setData(null);
    setLoading(true);
    getGPSLocation();
  };

  const getGPSLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchByCoords(latitude, longitude);
      },
      () => {
        setError("Location access denied.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const cached = loadFromCache();
    if (cached) {
      setData(cached);
      setLoading(false);
      setLastUpdated("cached");
      return;
    }
    const lastCity = localStorage.getItem(LAST_CITY_KEY);
    if (lastCity) {
      fetchByCity(lastCity);
      return;
    }
    getGPSLocation();
  }, []);

  return { data, loading, error, searchByCity, retryGPS, refresh, lastUpdated };
};