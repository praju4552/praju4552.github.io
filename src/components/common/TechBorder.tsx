import React from 'react';

interface TechBorderProps {
  children: React.ReactNode;
  title: string;
  coords?: { x: number; y: number };
  status?: 'ONLINE' | 'DIAGNOSTIC' | 'ERROR';
  idLabel?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const TechBorder: React.FC<TechBorderProps> = ({
  children,
  title,
  coords,
  status = 'ONLINE',
  idLabel,
  onClick,
  isActive = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-5 bg-blueprint-bg border border-blueprint-accent/20 cursor-pointer select-none transition-all duration-300 font-blueprint group ${
        isActive
          ? 'border-blueprint-accent shadow-[0_0_15px_rgba(0,240,255,0.15)] scale-[1.02]'
          : 'hover:border-blueprint-accent/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.05)]'
      }`}
    >
      {/* CAD Corner Brackets */}
      {/* Top Left */}
      <svg className="absolute top-0 left-0 w-3 h-3 text-blueprint-accent -translate-x-[0.5px] -translate-y-[0.5px] pointer-events-none">
        <path d="M 0,12 L 0,0 L 12,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {/* Top Right */}
      <svg className="absolute top-0 right-0 w-3 h-3 text-blueprint-accent translate-x-[0.5px] -translate-y-[0.5px] pointer-events-none">
        <path d="M 12,12 L 12,0 L 0,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {/* Bottom Left */}
      <svg className="absolute bottom-0 left-0 w-3 h-3 text-blueprint-accent -translate-x-[0.5px] translate-y-[0.5px] pointer-events-none">
        <path d="M 0,0 L 0,12 L 12,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {/* Bottom Right */}
      <svg className="absolute bottom-0 right-0 w-3 h-3 text-blueprint-accent translate-x-[0.5px] translate-y-[0.5px] pointer-events-none">
        <path d="M 12,0 L 12,12 L 0,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Header telemetry band */}
      <div className="flex items-center justify-between border-b border-blueprint-accent/10 pb-2 mb-3 text-[10px] tracking-widest text-blueprint-accent/60">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              status === 'ONLINE'
                ? 'bg-emerald-500 animate-pulse'
                : status === 'DIAGNOSTIC'
                ? 'bg-blueprint-warn animate-pulse'
                : 'bg-red-500 animate-ping'
            }`}
          />
          <span className="font-bold">{idLabel || 'SYS.NODE'}</span>
          <span className="opacity-30">|</span>
          <span className="font-medium tracking-normal text-[9px] uppercase">{title}</span>
        </div>
        
        {coords && (
          <span className="text-[8px] opacity-40 font-mono">
            [{coords.x.toFixed(0)}, {coords.y.toFixed(0)}]
          </span>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative text-blueprint-text text-xs leading-relaxed font-sans">
        {children}
      </div>

      {/* Sub-border coordinate tags */}
      <div className="absolute bottom-1 right-2 flex gap-2 text-[8px] text-blueprint-accent/30 pointer-events-none font-mono">
        <span>R:01</span>
        <span>C:01</span>
      </div>
    </div>
  );
};
