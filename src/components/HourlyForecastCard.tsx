import type { HourlyForecast } from "../types/weather";
import WeatherAnimation from "./WeatherAnimation";

interface Props {
  hourly: HourlyForecast[];
  isCelsius: boolean;
  isDark: boolean;
}

const toF = (c: number) => Math.round((c * 9) / 5 + 32);

export default function HourlyForecastCard({
  hourly,
  isCelsius,
  isDark,
}: Props) {
  const unit = isCelsius ? "°C" : "°F";

  return (
    <div
      className={`rounded-3xl p-6 shadow-xl
      ${isDark ? "bg-gray-800" : "bg-white"}`}
    >
      <h2
        className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}
      >
        ⏰ Next 24 Hours
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hourly.map((h, i) => (
          <div
            key={i}
            className={`flex flex-col items-center min-w-[70px] rounded-2xl p-3 gap-1
              ${isDark ? "bg-gray-700" : "bg-blue-50"}`}
          >
            <p
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {h.time}
            </p>
            <WeatherAnimation condition={h.condition} size={40} time={h.time} />
            <p
              className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
            >
              {isCelsius ? Math.round(h.temp) : toF(h.temp)}
              {unit}
            </p>
            <p className="text-xs text-blue-400">{h.rainProbability}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
