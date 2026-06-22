import type { HourlyForecast } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface Props {
  hourly: HourlyForecast[];
  isCelsius: boolean;
}

const toF = (c: number) => Math.round(c * 9 / 5 + 32);

export default function HourlyForecastCard({ hourly, isCelsius }: Props) {
  const unit = isCelsius ? "°C" : "°F";

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h2 className="text-lg font-bold text-gray-800 mb-4">⏰ Next 24 Hours</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hourly.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[70px] bg-blue-50 rounded-2xl p-3 gap-1"
          >
            <p className="text-xs text-gray-500">{h.time}</p>
            <WeatherIcon condition={h.condition} size="text-2xl" />
            <p className="font-semibold text-gray-800">
              {isCelsius ? Math.round(h.temp) : toF(h.temp)}{unit}
            </p>
            <p className="text-xs text-blue-500">{h.rainProbability}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}