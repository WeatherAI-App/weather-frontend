import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
  onRetryGPS: () => void;
}

export default function SearchBar({ onSearch, onRetryGPS }: Props) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search city... (e.g. Tokyo, London)"
        className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 
                   bg-white shadow-sm focus:outline-none focus:ring-2 
                   focus:ring-blue-400 text-gray-800"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 
                   rounded-2xl shadow-sm transition font-semibold"
      >
        🔍
      </button>
      <button
        onClick={onRetryGPS}
        title="Use my location"
        className="bg-white hover:bg-gray-50 text-gray-600 px-4 py-3 
                   rounded-2xl border border-gray-200 shadow-sm transition"
      >
        📍
      </button>
    </div>
  );
}