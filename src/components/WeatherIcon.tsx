interface Props {
  condition: string;
  size?: string;
  time?: string; // e.g. "20:00"
}

export default function WeatherIcon({
  condition,
  size = "text-4xl",
  time,
}: Props) {
  const isNightTime = (time?: string): boolean => {
    if (!time) {
      const hour = new Date().getHours();
      return hour >= 19 || hour < 6;
    }
    const hour = parseInt(time.split(":")[0]);
    return hour >= 19 || hour < 6;
  };

  const getIcon = (condition: string, isNight: boolean) => {
    switch (condition.toLowerCase()) {
      case "clear sky":
        return isNight ? "🌙" : "☀️";
      case "partly cloudy":
        return isNight ? "🌙" : "⛅"; // 👈 change 🌛 to 🌙
      case "overcast":
        return "☁️";
      case "foggy":
        return "🌫️";
      case "rainy":
        return "🌧️";
      case "snowy":
        return "❄️";
      case "showers":
        return isNight ? "🌧️" : "🌦️";
      case "thunderstorm":
        return "⛈️";
      default:
        return isNight ? "🌙" : "🌤️";
    }
  };

  const night = isNightTime(time);

  return <span className={size}>{getIcon(condition, night)}</span>;
}
