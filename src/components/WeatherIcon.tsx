interface Props {
  condition: string;
  size?: string;
}

export default function WeatherIcon({ condition, size = "text-4xl" }: Props) {
  const getIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear sky": return "☀️";
      case "partly cloudy": return "⛅";
      case "overcast": return "☁️";
      case "foggy": return "🌫️";
      case "rainy": return "🌧️";
      case "snowy": return "❄️";
      case "showers": return "🌦️";
      case "thunderstorm": return "⛈️";
      default: return "🌤️";
    }
  };

  return <span className={size}>{getIcon(condition)}</span>;
}