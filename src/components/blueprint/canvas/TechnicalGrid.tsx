import React from 'react';

interface TechnicalGridProps {
  zoom: number;
  pan: { x: number; y: number };
}

export const TechnicalGrid: React.FC<TechnicalGridProps> = ({ zoom, pan }) => {
  const step = 200;
  const numTicksX = 20;
  const numTicksY = 15;

  const ticksX = Array.from({ length: numTicksX }, (_, i) => (i - numTicksX / 2) * step);
  const ticksY = Array.from({ length: numTicksY }, (_, i) => (i - numTicksY / 2) * step);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* CAD Grid Backdrop */}
      <svg className="absolute inset-0 w-full h-full text-blueprint-accent" style={{ opacity: 'var(--blueprint-grid-opacity, 0.15)' }}>
        <defs>
          <pattern id="minor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,3" />
          </pattern>
          <pattern id="major-grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#minor-grid)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#major-grid)"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px)`,
          }}
        />

        <g style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <line x1="-10000" y1="0" x2="10000" y2="0" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="-10000" x2="0" y2="10000" stroke="currentColor" strokeWidth="1.5" />
          
          {ticksX.map((x) => (
            <g key={`tick-x-${x}`} style={{ transform: `translateX(${x}px)` }}>
              <line x1="0" y1="-5" x2="0" y2="5" stroke="currentColor" strokeWidth="1" />
              <text
                x="5"
                y="-8"
                fontSize="10"
                fontFamily="var(--blueprint-font)"
                className="fill-current text-blueprint-accent opacity-60"
              >
                X:{x}
              </text>
            </g>
          ))}

          {ticksY.map((y) => (
            <g key={`tick-y-${y}`} style={{ transform: `translateY(${y}px)` }}>
              <line x1="-5" y1="0" x2="5" y2="0" stroke="currentColor" strokeWidth="1" />
              <text
                x="8"
                y="4"
                fontSize="10"
                fontFamily="var(--blueprint-font)"
                className="fill-current text-blueprint-accent opacity-60"
              >
                Y:{y}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute inset-4 border border-blueprint-accent/20 pointer-events-none flex flex-col justify-between p-2 font-blueprint text-[10px] text-blueprint-accent/40">
        <div className="flex justify-between w-full">
          <span>SYS.TELEMETRY: ACTIVE</span>
          <span>SCALE: {(zoom * 100).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between w-full">
          <span>COORD_ENGINE: [PAN_X: {pan.x.toFixed(0)}, PAN_Y: {pan.y.toFixed(0)}]</span>
          <span>SYSTEM_GRID: 200px STAGES</span>
        </div>
      </div>
    </div>
  );
};
