import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { FavoriteLocation } from "../types/weather";
import { API } from "../config/api";

const API_BASE = API.LOCATIONS;

export const useFavorites = (token: string | null) => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  const authHeader = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : null;

  const getFavorites = useCallback(async () => {
    if (!token || !authHeader) return;
    try {
      const response = await axios.get<FavoriteLocation[]>(
        `${API_BASE}/favorites`, authHeader
      );
      setFavorites(response.data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  }, [token]);

  const addFavorite = useCallback(async (
    cityName: string, lat: number,
    lon: number, country: string
  ) => {
    if (!token || !authHeader) return;
    try {
      const response = await axios.post<FavoriteLocation>(
        `${API_BASE}/favorites`,
        { cityName, lat, lon, country },
        authHeader
      );
      setFavorites(prev => [...prev, response.data]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Failed to add favorite");
    }
  }, [token]);

  const removeFavorite = useCallback(async (id: string) => {
    if (!token || !authHeader) return;
    try {
      await axios.delete(`${API_BASE}/favorites/${id}`, authHeader);
      setFavorites(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  }, [token]);

  const isFavorite = (cityName: string): boolean => {
    return favorites.some(
      f => f.cityName.toLowerCase() === cityName.toLowerCase()
    );
  };

  useEffect(() => {
    if (token) getFavorites();
  }, [token, getFavorites]);

  return { favorites, getFavorites, addFavorite, removeFavorite, isFavorite };
};