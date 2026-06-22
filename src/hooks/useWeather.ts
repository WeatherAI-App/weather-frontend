import { useState, useEffect } from "react";
import axios from "axios";
import type { WeatherResponse } from "../types/weather";

const API_BASE = "http://localhost:8080/api/weather";

export const useWeather = () => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const fetchByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/forecast`, {
        params: { lat, lon }
      });
      setData(response.data);
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
    } catch (err) {
      setError(`City "${city}" not found. Please try another name.`);
    } finally {
      setLoading(false);
    }
  };

  const searchByCity = (city: string) => {
    setSearchCity(city);
  };

  const retryGPS = () => {
    setSearchCity(null);
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

  // Initial load — try GPS first
  useEffect(() => {
    if (searchCity) {
      fetchByCity(searchCity);
    }
  }, [searchCity]);

  useEffect(() => {
    getGPSLocation();
  }, []);

  return { data, loading, error, searchByCity, retryGPS };
};