import type { DailyForecast } from "../types/weather";
import WeatherAnimation from "./WeatherAnimation";

interface Props {
  daily: DailyForecast[];
  isCelsius: boolean;
  isDark: boolean;
}

const toF = (c: number) => Math.round((c * 9) / 5 + 32);

export default function DailyForecastCard({ daily, isCelsius, isDark }: Props) {
  const unit = isCelsius ? "°C" : "°F";

  return (
    <div
      className={`rounded-3xl p-6 shadow-xl
      ${isDark ? "bg-gray-800" : "bg-white"}`}
    >
      <h2
        className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}
      >
        📅 7-Day Forecast
      </h2>
      <div className="flex flex-col gap-3">
        {daily.map((d, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-2xl px-4 py-3
              ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
          >
            <div className="w-24">
              <p
                className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
              >
                {d.dayName}
              </p>
              <p
                className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {d.date}
              </p>
            </div>
            <WeatherAnimation condition={d.condition} size={40} />
            <p className="text-xs text-blue-400 w-10 text-center">
              {d.rainProbability}%🌧️
            </p>
            <div className="flex gap-2 text-sm">
              <span
                className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
              >
                {isCelsius ? Math.round(d.maxTemp) : toF(d.maxTemp)}
                {unit}
              </span>
              <span className={isDark ? "text-gray-400" : "text-gray-400"}>
                {isCelsius ? Math.round(d.minTemp) : toF(d.minTemp)}
                {unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
