import { useState, useEffect, useRef } from "react";
import axios from "axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/weather";
import { API } from "../config/api";

const API_BASE = API.AUTH;
const TOKEN_KEY = "weatherai_token";
const USER_KEY = "weatherai_user";
const AUTH_CHANNEL = "weatherai_auth";

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evicted, setEvicted] = useState(false);

  // Keep a ref so the BroadcastChannel handler always sees the current user
  // without needing to be recreated on every render.
  const userRef = useRef<AuthResponse | null>(null);
  useEffect(() => { userRef.current = user; }, [user]);

  // Restore session from sessionStorage on mount (cleared on browser close).
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const savedUser = sessionStorage.getItem(USER_KEY);
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // Clean up any stale data left in localStorage from the old implementation.
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  // Listen for logins that happen in other tabs.
  useEffect(() => {
    const channel = new BroadcastChannel(AUTH_CHANNEL);
    channel.onmessage = (event) => {
      if (
        event.data.type === "LOGIN" &&
        userRef.current?.email === event.data.email
      ) {
        // Same account just signed in on another tab — evict this session.
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
        setUser(null);
        setEvicted(true);
      }
    };
    return () => channel.close();
  }, []);

  const clearEvicted = () => setEvicted(false);

  const register = async (request: RegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(
        `${API_BASE}/register`, request
      );
      setUser(response.data);
      setEvicted(false);
      sessionStorage.setItem(TOKEN_KEY, response.data.token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(response.data));
      const bc = new BroadcastChannel(AUTH_CHANNEL);
      bc.postMessage({ type: "LOGIN", email: response.data.email });
      bc.close();
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
      setEvicted(false);
      sessionStorage.setItem(TOKEN_KEY, response.data.token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(response.data));
      // Notify other tabs that this account just logged in here.
      const bc = new BroadcastChannel(AUTH_CHANNEL);
      bc.postMessage({ type: "LOGIN", email: response.data.email });
      bc.close();
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
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  };

  const getToken = (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
  };

  return { user, loading, error, evicted, clearEvicted, register, login, logout, getToken };
};