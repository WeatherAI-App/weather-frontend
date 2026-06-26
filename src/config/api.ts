const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const API = {
  WEATHER: `${API_BASE_URL}/api/weather`,
  AUTH: `${API_BASE_URL}/api/auth`,
  LOCATIONS: `${API_BASE_URL}/api/locations`,
};