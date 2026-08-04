import React from 'react';
import { ModuleCard } from '../modules/ModuleCard';
import { ProfileSchema } from '../../../types/blueprint';

interface CentralCoreProps {
  coords: { x: number; y: number; scale: number; rotation: number };
  data: ProfileSchema;
  explodeFactor: number;
  onExplodeToggle: () => void;
  isActive: boolean;
  onClick: () => void;
}

export const CentralCore: React.FC<CentralCoreProps> = ({
  coords,
  data,
  explodeFactor,
  onExplodeToggle,
  isActive,
  onClick,
}) => {
  return (
    <ModuleCard
      id="central_core"
      title="Resume Core Unit"
      coords={coords}
      status="ONLINE"
      idLabel="CORE.PROCESSOR"
      isActive={isActive}
      onClick={onClick}
    >
      <div className="space-y-4 font-blueprint text-left">
        <div>
          <h2 className="text-blueprint-accent text-base font-extrabold tracking-wider">
            {data.name}
          </h2>
          <p className="text-[10px] text-blueprint-accent/70 tracking-widest mt-0.5">
            {data.role}
          </p>
        </div>

        <div className="text-[10px] opacity-75 border-y border-blueprint-accent/15 py-2 leading-relaxed">
          LOCATION: {data.location} <br />
          STATUS: ACTIVE_DIAGNOSTICS
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          {data.metrics.map((m, idx) => (
            <div key={idx} className="p-1.5 border border-blueprint-accent/10 bg-blueprint-accent/[0.02]">
              <span className="text-[8px] text-blueprint-accent/50 block tracking-widest uppercase">
                {m.label}
              </span>
              <span className="text-xs font-bold text-blueprint-accent">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onExplodeToggle();
          }}
          className="w-full mt-2 py-2 border border-blueprint-accent hover:bg-blueprint-accent hover:text-blueprint-bg font-bold tracking-widest transition-all duration-300 rounded-sm text-[10px]"
        >
          {explodeFactor > 0.5 ? 'ASSEMBLE_CORE_SYSTEM' : 'EXPLODE_CORE_SYSTEM'}
        </button>
      </div>
    </ModuleCard>
  );
};
