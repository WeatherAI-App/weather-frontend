import { useState, useEffect } from "react";
import axios from "axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/weather";

const API_BASE = "http://localhost:8080/api/auth";
const TOKEN_KEY = "weatherai_token";
const USER_KEY = "weatherai_user";

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (request: RegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(
        `${API_BASE}/register`, request
      );
      setUser(response.data);
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (request: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(
        `${API_BASE}/login`, request
      );
      setUser(response.data);
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid email or password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  };

  return { user, loading, error, register, login, logout, getToken };
};