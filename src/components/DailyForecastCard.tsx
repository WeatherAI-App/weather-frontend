import type { DailyForecast } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface Props {
  daily: DailyForecast[];
  isCelsius: boolean;
}

const toF = (c: number) => Math.round(c * 9 / 5 + 32);

export default function DailyForecastCard({ daily, isCelsius }: Props) {
  const unit = isCelsius ? "°C" : "°F";

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h2 className="text-lg font-bold text-gray-800 mb-4">📅 7-Day Forecast</h2>
      <div className="flex flex-col gap-3">
        {daily.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3"
          >
            <div className="w-24">
              <p className="font-semibold text-gray-800">{d.dayName}</p>
              <p className="text-xs text-gray-500">{d.date}</p>
            </div>
            <WeatherIcon condition={d.condition} size="text-2xl" />
            <p className="text-xs text-blue-500 w-10 text-center">{d.rainProbability}%🌧️</p>
            <div className="flex gap-2 text-sm">
              <span className="font-semibold text-gray-800">
                {isCelsius ? Math.round(d.maxTemp) : toF(d.maxTemp)}{unit}
              </span>
              <span className="text-gray-400">
                {isCelsius ? Math.round(d.minTemp) : toF(d.minTemp)}{unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}