import { useState, useEffect } from "react";
import axios from "axios";
import type { FavoriteLocation } from "../types/weather";

const API_BASE = "http://localhost:8080/api/locations";

export const useFavorites = (token: string | null) => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  const authHeader = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : null;

  const getFavorites = async () => {
    if (!token || !authHeader) return;
    try {
      const response = await axios.get<FavoriteLocation[]>(
        `${API_BASE}/favorites`, authHeader
      );
      setFavorites(response.data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  };

  const addFavorite = async (
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
  };

  const removeFavorite = async (id: string) => {
    if (!token || !authHeader) return;
    try {
      await axios.delete(`${API_BASE}/favorites/${id}`, authHeader);
      setFavorites(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  const isFavorite = (cityName: string): boolean => {
    return favorites.some(
      f => f.cityName.toLowerCase() === cityName.toLowerCase()
    );
  };

  useEffect(() => {
    if (token) getFavorites();
  }, [token]);

  return { favorites, getFavorites, addFavorite, removeFavorite, isFavorite };
};