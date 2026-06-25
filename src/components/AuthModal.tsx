import { useState } from "react";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/weather";

interface Props {
  onClose: () => void;
  isDark: boolean;
  onLogin: (request: LoginRequest) => Promise<AuthResponse>;
  onRegister: (request: RegisterRequest) => Promise<AuthResponse>;
  loading: boolean;
  error: string | null;
}

export default function AuthModal({
  onClose,
  isDark,
  onLogin,
  onRegister,
  loading,
  error,
}: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await onLogin({ email, password });
      } else {
        await onRegister({ name, email, password });
      }
      onClose();
    } catch {
      // error handled by parent
    }
  };

  const bg = isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800";
  const input = isDark
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-gray-50 border-gray-200 text-gray-800";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${bg} rounded-3xl p-6 w-full max-w-sm shadow-2xl`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {isLogin ? "Welcome back 👋" : "Create account 🌤️"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 rounded-2xl p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`px-4 py-3 rounded-2xl border focus:outline-none
                focus:ring-2 focus:ring-blue-400 ${input}`}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-4 py-3 rounded-2xl border focus:outline-none
              focus:ring-2 focus:ring-blue-400 ${input}`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={`px-4 py-3 rounded-2xl border focus:outline-none
              focus:ring-2 focus:ring-blue-400 ${input}`}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50
                     text-white py-3 rounded-2xl font-semibold transition"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle */}
        <p className="text-center mt-4 text-sm text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-semibold"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
