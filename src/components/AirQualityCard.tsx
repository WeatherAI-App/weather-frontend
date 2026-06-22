import type { AirQuality } from "../types/weather";

interface Props {
  airQuality: AirQuality;
}

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "from-green-400 to-green-600";
  if (aqi <= 100) return "from-yellow-400 to-yellow-600";
  if (aqi <= 150) return "from-orange-400 to-orange-600";
  if (aqi <= 200) return "from-red-400 to-red-600";
  return "from-purple-400 to-purple-600";
};

export default function AirQualityCard({ airQuality }: Props) {
  return (
    <div className={`bg-gradient-to-br ${getAQIColor(airQuality.aqi)} rounded-3xl p-6 text-white shadow-xl`}>
      <h2 className="text-lg font-bold mb-3">🌬️ Air Quality</h2>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-5xl font-thin">{airQuality.aqi}</span>
        <div>
          <p className="font-semibold">{airQuality.level}</p>
          <p className="text-sm text-white/80">AQI (US Standard)</p>
        </div>
      </div>
      <p className="text-white/90 text-sm">{airQuality.advice}</p>
    </div>
  );
}