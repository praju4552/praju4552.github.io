import React, { useEffect, useState } from 'react';

interface TelemetryGaugeProps {
  label: string;
  initialValue?: number;
  type?: 'linear' | 'radial';
  colorClass?: string;
}

export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({
  label,
  initialValue = 72,
  type = 'linear',
  colorClass = 'text-blueprint-accent',
}) => {
  const [val, setVal] = useState(initialValue);

  // Add subtle fluctuations over time to simulate live telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setVal((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(10, Math.min(99, prev + delta));
      });
    }, 1500 + Math.random() * 1000);

    return () => clearInterval(timer);
  }, []);

  if (type === 'radial') {
    const radius = 18;
    const circum = 2 * Math.PI * radius;
    const offset = circum - (val / 100) * circum;

    return (
      <div className="flex items-center gap-3 font-blueprint select-none">
        <svg className="w-12 h-12 transform -rotate-90 text-blueprint-accent">
          {/* Inner circle track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2.5"
            className="opacity-10"
          />
          {/* Val indicator */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={circum}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-blueprint-accent/60">{label}</span>
          <span className="text-xs font-bold text-blueprint-accent">{val}%</span>
        </div>
      </div>
    );
  }

  // Linear bar
  return (
    <div className="w-full flex flex-col font-blueprint select-none text-[9px]">
      <div className="flex justify-between items-center mb-1 text-blueprint-accent/70">
        <span className="uppercase tracking-wider">{label}</span>
        <span className="font-bold">{val}%</span>
      </div>
      <div className="w-full h-1.5 bg-blueprint-accent/10 border border-blueprint-accent/20 rounded-sm overflow-hidden p-[1px]">
        <div
          className="h-full bg-blueprint-accent transition-all duration-500 ease-out rounded-sm opacity-80"
          style={{ width: `${val}%` }}
        />
      </div>
    </div>
  );
};
