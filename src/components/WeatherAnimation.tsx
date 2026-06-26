interface Props {
  condition: string;
  size?: number;
}

export default function WeatherAnimation({ condition, size = 120 }: Props) {
  const c = condition?.toLowerCase() || "";

  if (c.includes("thunder") || c.includes("storm"))
    return <Thunderstorm size={size} />;
  if (c.includes("snow")) return <Snow size={size} />;
  if (c.includes("rain") || c.includes("drizzle")) return <Rain size={size} />;
  if (c.includes("fog") || c.includes("mist") || c.includes("haze"))
    return <Foggy size={size} />;
  if (c.includes("overcast")) return <Overcast size={size} />;
  if (c.includes("partly cloudy") || c.includes("partly"))
    return <PartlyCloudy size={size} />;
  if (c.includes("cloudy") || c.includes("cloud"))
    return <Cloudy size={size} />;
  return <Sunny size={size} />;
}

// Reusable cloud shape using clipPath to prevent bleeding
function Cloud({ cx = 60, cy = 55, color1 = "#94A3B8", color2 = "#CBD5E1" }) {
  const x = cx - 60;
  const y = cy - 55;
  return (
    <g transform={`translate(${x}, ${y})`}>
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

// ☀️ Sunny
function Sunny({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-sun { 0%, 100% { opacity: 1; } 50% { opacity: 0.75; } }
        .sun-spin { transform-origin: 60px 60px; animation: spin-slow 10s linear infinite; }
        .sun-glow { animation: pulse-sun 2s ease-in-out infinite; }
      `}</style>
      <g className="sun-spin">
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
      <circle cx="60" cy="60" r="26" fill="#FDE68A" className="sun-glow" />
      <circle cx="60" cy="60" r="20" fill="#FBBF24" />
    </svg>
  );
}

// 🌧️ Rain
function Rain({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id="rain-clip">
          <rect x="0" y="0" width="120" height="120" />
        </clipPath>
      </defs>
      <style>{`
        @keyframes rain-fall { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(26px); opacity: 0; } }
        .rd1 { animation: rain-fall 1s ease-in infinite; }
        .rd2 { animation: rain-fall 1s ease-in 0.25s infinite; }
        .rd3 { animation: rain-fall 1s ease-in 0.5s infinite; }
        .rd4 { animation: rain-fall 1s ease-in 0.75s infinite; }
        .rd5 { animation: rain-fall 1s ease-in 0.4s infinite; }
      `}</style>
      <g clipPath="url(#rain-clip)">
        <Cloud cx={60} cy={48} />
        <line
          x1="38"
          y1="76"
          x2="33"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="rd1"
        />
        <line
          x1="52"
          y1="76"
          x2="47"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="rd2"
        />
        <line
          x1="66"
          y1="76"
          x2="61"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="rd3"
        />
        <line
          x1="80"
          y1="76"
          x2="75"
          y2="90"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="rd4"
        />
        <line
          x1="45"
          y1="86"
          x2="40"
          y2="100"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="rd5"
        />
      </g>
    </svg>
  );
}

// ⛈️ Thunderstorm
function Thunderstorm({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id="storm-clip">
          <rect x="0" y="0" width="120" height="120" />
        </clipPath>
      </defs>
      <style>{`
        @keyframes bolt-flash { 0%, 80%, 100% { opacity: 0; } 85%, 95% { opacity: 1; } }
        @keyframes storm-rain { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(22px); opacity: 0; } }
        .bolt { animation: bolt-flash 2.5s ease-in-out infinite; }
        .sr1 { animation: storm-rain 1s ease-in infinite; }
        .sr2 { animation: storm-rain 1s ease-in 0.35s infinite; }
        .sr3 { animation: storm-rain 1s ease-in 0.7s infinite; }
      `}</style>
      <g clipPath="url(#storm-clip)">
        <Cloud cx={60} cy={45} color1="#475569" color2="#64748B" />
        <polygon
          points="64,68 54,84 63,84 52,102 74,78 64,78 74,68"
          fill="#FCD34D"
          className="bolt"
        />
        <line
          x1="30"
          y1="72"
          x2="25"
          y2="84"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          className="sr1"
        />
        <line
          x1="90"
          y1="72"
          x2="85"
          y2="84"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          className="sr2"
        />
        <line
          x1="98"
          y1="78"
          x2="93"
          y2="90"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          className="sr3"
        />
      </g>
    </svg>
  );
}

// ☁️ Cloudy
function Cloudy({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes cloud-drift { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
        .cd { animation: cloud-drift 3s ease-in-out infinite; }
      `}</style>
      <g className="cd">
        <Cloud cx={60} cy={60} />
      </g>
    </svg>
  );
}

// 🌤️ Partly Cloudy
function PartlyCloudy({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes spin-pc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes drift-pc { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        .sun-pc { transform-origin: 34px 34px; animation: spin-pc 10s linear infinite; }
        .cloud-pc { animation: drift-pc 3s ease-in-out infinite; }
      `}</style>
      {/* Sun */}
      <g className="sun-pc">
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
      {/* Cloud in front */}
      <g className="cloud-pc">
        <Cloud cx={68} cy={72} />
      </g>
    </svg>
  );
}

// 🌫️ Foggy
function Foggy({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes fog-r { 0%, 100% { transform: translateX(0); opacity: 0.8; } 50% { transform: translateX(8px); opacity: 1; } }
        @keyframes fog-l { 0%, 100% { transform: translateX(0); opacity: 0.6; } 50% { transform: translateX(-8px); opacity: 1; } }
        .fl1 { animation: fog-r 3s ease-in-out infinite; }
        .fl2 { animation: fog-l 3s ease-in-out infinite; }
        .fl3 { animation: fog-r 3s ease-in-out 1s infinite; }
        .fl4 { animation: fog-l 3s ease-in-out 0.5s infinite; }
      `}</style>
      <rect
        x="15"
        y="28"
        width="90"
        height="10"
        rx="5"
        fill="#94A3B8"
        className="fl1"
      />
      <rect
        x="22"
        y="46"
        width="76"
        height="10"
        rx="5"
        fill="#94A3B8"
        className="fl2"
      />
      <rect
        x="10"
        y="64"
        width="100"
        height="10"
        rx="5"
        fill="#94A3B8"
        className="fl3"
      />
      <rect
        x="18"
        y="82"
        width="84"
        height="10"
        rx="5"
        fill="#94A3B8"
        className="fl4"
      />
    </svg>
  );
}

// 🌨️ Snow
function Snow({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id="snow-clip">
          <rect x="0" y="0" width="120" height="120" />
        </clipPath>
      </defs>
      <style>{`
        @keyframes snow1 { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(32px) rotate(180deg); opacity: 0; } }
        @keyframes snow2 { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(32px) rotate(-180deg); opacity: 0; } }
        .sn1 { animation: snow1 2s ease-in infinite; }
        .sn2 { animation: snow2 2s ease-in 0.4s infinite; }
        .sn3 { animation: snow1 2s ease-in 0.8s infinite; }
        .sn4 { animation: snow2 2s ease-in 1.2s infinite; }
        .sn5 { animation: snow1 2s ease-in 0.6s infinite; }
      `}</style>
      <g clipPath="url(#snow-clip)">
        <Cloud cx={60} cy={48} />
        <text x="28" y="82" fontSize="13" fill="#BAE6FD" className="sn1">
          ❄
        </text>
        <text x="46" y="80" fontSize="11" fill="#BAE6FD" className="sn2">
          ❄
        </text>
        <text x="63" y="84" fontSize="13" fill="#BAE6FD" className="sn3">
          ❄
        </text>
        <text x="79" y="81" fontSize="11" fill="#BAE6FD" className="sn4">
          ❄
        </text>
        <text x="40" y="93" fontSize="9" fill="#BAE6FD" className="sn5">
          ❄
        </text>
      </g>
    </svg>
  );
}

// 🌥️ Overcast
function Overcast({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <style>{`
        @keyframes overcast-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .ob { animation: overcast-bob 4s ease-in-out infinite; }
      `}</style>
      <g className="ob">
        {/* Back cloud */}
        <Cloud cx={65} cy={48} color1="#64748B" color2="#64748B" />
        {/* Front cloud */}
        <Cloud cx={55} cy={65} />
      </g>
    </svg>
  );
}
