import { useId } from "react";

interface Props {
  condition: string;
  size?: number;
  time?: string;
}

export default function WeatherAnimation({
  condition,
  size = 120,
  time,
}: Props) {
  const id = useId().replace(/:/g, "");
  const c = condition?.toLowerCase() || "";

  // Check if it's nighttime (between 18:00 and 06:00)
  const isNight = () => {
    if (!time) return false;
    const hour = parseInt(time.split(":")[0]);
    return hour >= 18 || hour < 6;
  };

  const night = isNight();

  if (c.includes("thunder") || c.includes("storm"))
    return <Thunderstorm size={size} id={id} />;
  if (c.includes("snow")) return <Snow size={size} id={id} />;
  if (c.includes("rain") || c.includes("drizzle"))
    return <Rain size={size} id={id} />;
  if (c.includes("fog") || c.includes("mist") || c.includes("haze"))
    return <Foggy size={size} id={id} />;
  if (c.includes("overcast")) return <Overcast size={size} id={id} />;
  if (c.includes("partly cloudy") || c.includes("partly"))
    return night ? (
      <NightPartlyCloudy size={size} id={id} />
    ) : (
      <PartlyCloudy size={size} id={id} />
    );
  if (c.includes("cloudy") || c.includes("cloud"))
    return <Cloudy size={size} id={id} />;
  if (c.includes("sunny") || c.includes("clear"))
    return night ? <Moon size={size} id={id} /> : <Sunny size={size} id={id} />;
  return night ? <Moon size={size} id={id} /> : <Sunny size={size} id={id} />;
}

function Cloud({ color1 = "#94A3B8", color2 = "#CBD5E1" }) {
  return (
    <g>
      <path
        d="M 104 60 
           C 104 49 95 40 84 40 
           C 82 40 80 40 78 41 
           C 74 33 66 28 56 28 
           C 42 28 30 39 30 53 
           C 30 54 30 54 30 55 
           C 22 57 16 64 16 72 
           C 16 81 23 88 32 88 
           L 96 88 
           C 101 88 104 84 104 80 
           C 104 76 101 72 97 71 
           C 101 68 104 64 104 60 Z"
        fill={color1}
      />
      <path
        d="M 32 88 
           C 23 88 16 81 16 72 
           C 16 64 22 57 30 55 
           C 30 54 30 54 30 53 
           C 30 39 42 28 56 28 
           C 66 28 74 33 78 41 
           C 80 40 82 40 84 40 
           C 95 40 104 49 104 60 
           C 104 64 101 68 97 71 
           C 101 72 104 76 104 80 
           C 104 84 101 88 96 88 Z"
        fill={color2}
        opacity="0.5"
      />
    </g>
  );
}

function Sunny({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes spin-${id} { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-${id} { 0%, 100% { opacity: 1; } 50% { opacity: 0.75; } }
        .sun-spin-${id} { transform-origin: 60px 60px; animation: spin-${id} 10s linear infinite; }
        .sun-glow-${id} { animation: pulse-${id} 2s ease-in-out infinite; }
      `}</style>
      <g className={`sun-spin-${id}`}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="60"
            y1="10"
            x2="60"
            y2="22"
            stroke="#FBBF24"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 60 60)`}
          />
        ))}
      </g>
      <circle
        cx="60"
        cy="60"
        r="26"
        fill="#FDE68A"
        className={`sun-glow-${id}`}
      />
      <circle cx="60" cy="60" r="20" fill="#FBBF24" />
    </svg>
  );
}

function Rain({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id={`rain-clip-${id}`}>
          <rect x="0" y="0" width="120" height="120" />
        </clipPath>
      </defs>
      <style>{`
        @keyframes rain-fall-${id} { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(26px); opacity: 0; } }
        .rd1-${id} { animation: rain-fall-${id} 1s ease-in infinite; }
        .rd2-${id} { animation: rain-fall-${id} 1s ease-in 0.25s infinite; }
        .rd3-${id} { animation: rain-fall-${id} 1s ease-in 0.5s infinite; }
        .rd4-${id} { animation: rain-fall-${id} 1s ease-in 0.75s infinite; }
        .rd5-${id} { animation: rain-fall-${id} 1s ease-in 0.4s infinite; }
      `}</style>
      <g clipPath={`url(#rain-clip-${id})`}>
        <Cloud />
        <line
          x1="38"
          y1="76"
          x2="33"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`rd1-${id}`}
        />
        <line
          x1="52"
          y1="76"
          x2="47"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`rd2-${id}`}
        />
        <line
          x1="66"
          y1="76"
          x2="61"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`rd3-${id}`}
        />
        <line
          x1="80"
          y1="76"
          x2="75"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`rd4-${id}`}
        />
        <line
          x1="45"
          y1="86"
          x2="40"
          y2="100"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`rd5-${id}`}
        />
      </g>
    </svg>
  );
}

function Thunderstorm({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id={`storm-clip-${id}`}>
          <rect x="0" y="0" width="120" height="120" />
        </clipPath>
      </defs>
      <style>{`
        @keyframes bolt-flash-${id} { 0%, 80%, 100% { opacity: 0; } 85%, 95% { opacity: 1; } }
        @keyframes storm-rain-${id} { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(22px); opacity: 0; } }
        .bolt-${id} { animation: bolt-flash-${id} 2.5s ease-in-out infinite; }
        .sr1-${id} { animation: storm-rain-${id} 1s ease-in infinite; }
        .sr2-${id} { animation: storm-rain-${id} 1s ease-in 0.35s infinite; }
        .sr3-${id} { animation: storm-rain-${id} 1s ease-in 0.7s infinite; }
      `}</style>
      <g clipPath={`url(#storm-clip-${id})`}>
        <Cloud color1="#475569" color2="#64748B" />
        <polygon
          points="64,68 54,84 63,84 52,102 74,78 64,78 74,68"
          fill="#FCD34D"
          className={`bolt-${id}`}
        />
        <line
          x1="30"
          y1="72"
          x2="25"
          y2="84"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          className={`sr1-${id}`}
        />
        <line
          x1="90"
          y1="72"
          x2="85"
          y2="84"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          className={`sr2-${id}`}
        />
        <line
          x1="98"
          y1="78"
          x2="93"
          y2="90"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          className={`sr3-${id}`}
        />
      </g>
    </svg>
  );
}

function Cloudy({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes cloud-drift-${id} { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
        .cd-${id} { animation: cloud-drift-${id} 3s ease-in-out infinite; }
      `}</style>
      <g className={`cd-${id}`}>
        <Cloud />
      </g>
    </svg>
  );
}

function PartlyCloudy({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes spin-pc-${id} { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes drift-pc-${id} { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        .sun-pc-${id} { transform-origin: 34px 34px; animation: spin-pc-${id} 10s linear infinite; }
        .cloud-pc-${id} { animation: drift-pc-${id} 3s ease-in-out infinite; }
      `}</style>
      <g className={`sun-pc-${id}`}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="34"
            y1="14"
            x2="34"
            y2="24"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 34 34)`}
          />
        ))}
      </g>
      <circle cx="34" cy="34" r="14" fill="#FDE68A" />
      <circle cx="34" cy="34" r="10" fill="#FBBF24" />
      <g className={`cloud-pc-${id}`}>
        <g transform="translate(8, 20) scale(0.85)">
          <Cloud />
        </g>
      </g>
    </svg>
  );
}

function Foggy({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes fog-r-${id} { 0%, 100% { transform: translateX(0); opacity: 0.8; } 50% { transform: translateX(8px); opacity: 1; } }
        @keyframes fog-l-${id} { 0%, 100% { transform: translateX(0); opacity: 0.6; } 50% { transform: translateX(-8px); opacity: 1; } }
        .fl1-${id} { animation: fog-r-${id} 3s ease-in-out infinite; }
        .fl2-${id} { animation: fog-l-${id} 3s ease-in-out infinite; }
        .fl3-${id} { animation: fog-r-${id} 3s ease-in-out 1s infinite; }
        .fl4-${id} { animation: fog-l-${id} 3s ease-in-out 0.5s infinite; }
      `}</style>
      <rect
        x="15"
        y="28"
        width="90"
        height="10"
        rx="5"
        fill="#94A3B8"
        className={`fl1-${id}`}
      />
      <rect
        x="22"
        y="46"
        width="76"
        height="10"
        rx="5"
        fill="#94A3B8"
        className={`fl2-${id}`}
      />
      <rect
        x="10"
        y="64"
        width="100"
        height="10"
        rx="5"
        fill="#94A3B8"
        className={`fl3-${id}`}
      />
      <rect
        x="18"
        y="82"
        width="84"
        height="10"
        rx="5"
        fill="#94A3B8"
        className={`fl4-${id}`}
      />
    </svg>
  );
}

function Snow({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id={`snow-clip-${id}`}>
          <rect x="0" y="0" width="120" height="120" />
        </clipPath>
      </defs>
      <style>{`
        @keyframes snow1-${id} { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(32px) rotate(180deg); opacity: 0; } }
        @keyframes snow2-${id} { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(32px) rotate(-180deg); opacity: 0; } }
        .sn1-${id} { animation: snow1-${id} 2s ease-in infinite; }
        .sn2-${id} { animation: snow2-${id} 2s ease-in 0.4s infinite; }
        .sn3-${id} { animation: snow1-${id} 2s ease-in 0.8s infinite; }
        .sn4-${id} { animation: snow2-${id} 2s ease-in 1.2s infinite; }
        .sn5-${id} { animation: snow1-${id} 2s ease-in 0.6s infinite; }
      `}</style>
      <g clipPath={`url(#snow-clip-${id})`}>
        <Cloud />
        <text
          x="28"
          y="82"
          fontSize="13"
          fill="#BAE6FD"
          className={`sn1-${id}`}
        >
          ❄
        </text>
        <text
          x="46"
          y="80"
          fontSize="11"
          fill="#BAE6FD"
          className={`sn2-${id}`}
        >
          ❄
        </text>
        <text
          x="63"
          y="84"
          fontSize="13"
          fill="#BAE6FD"
          className={`sn3-${id}`}
        >
          ❄
        </text>
        <text
          x="79"
          y="81"
          fontSize="11"
          fill="#BAE6FD"
          className={`sn4-${id}`}
        >
          ❄
        </text>
        <text x="40" y="93" fontSize="9" fill="#BAE6FD" className={`sn5-${id}`}>
          ❄
        </text>
      </g>
    </svg>
  );
}

function Overcast({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes overcast-bob-${id} { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .ob-${id} { animation: overcast-bob-${id} 4s ease-in-out infinite; }
      `}</style>
      <g className={`ob-${id}`}>
        <g transform="translate(5, -10) scale(0.9)">
          <Cloud color1="#64748B" color2="#64748B" />
        </g>
        <g transform="translate(-5, 8) scale(0.95)">
          <Cloud />
        </g>
      </g>
    </svg>
  );
}

function Moon({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes star1-${id} { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes star2-${id} { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.2; } }
        .star1-${id} { animation: star1-${id} 2s ease-in-out infinite; }
        .star2-${id} { animation: star2-${id} 2.5s ease-in-out infinite; }
        .star3-${id} { animation: star1-${id} 1.8s ease-in-out infinite; }
      `}</style>
      {/* Moon crescent only - no glow circle */}
      <path
        d="M 58 32 
           C 38 32 22 48 22 68 
           C 22 88 38 104 58 104 
           C 72 104 84 96 90 84 
           C 82 86 74 86 66 82 
           C 52 74 44 60 44 44 
           C 44 40 45 36 46 32 
           C 50 32 54 32 58 32 Z"
        fill="#FCD34D"
      />
      {/* Stars */}
      <circle cx="82" cy="36" r="3" fill="white" className={`star1-${id}`} />
      <circle cx="94" cy="52" r="2" fill="white" className={`star2-${id}`} />
      <circle cx="76" cy="22" r="1.5" fill="white" className={`star3-${id}`} />
      <circle cx="96" cy="38" r="1.5" fill="white" className={`star1-${id}`} />
    </svg>
  );
}

function NightPartlyCloudy({ size, id }: { size: number; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes drift-night-${id} { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        .cloud-n-${id} { animation: drift-night-${id} 3s ease-in-out infinite; }
      `}</style>
      {/* Moon crescent only */}
      <path
        d="M 36 18
           C 24 18 14 28 14 40
           C 14 52 24 62 36 62
           C 44 62 51 58 55 51
           C 50 52 45 52 40 49
           C 32 44 27 36 27 27
           C 27 24 28 21 29 18
           C 31 18 34 18 36 18 Z"
        fill="#FCD34D"
      />
      {/* Cloud in front */}
      <g className={`cloud-n-${id}`}>
        <g transform="translate(8, 22) scale(0.85)">
          <Cloud />
        </g>
      </g>
    </svg>
  );
}
