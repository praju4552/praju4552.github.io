import React from 'react';
import { ModuleCard } from './ModuleCard';
import { ProfileSchema } from '../../../types/blueprint';
import { TelemetryGauge } from '../../common/TelemetryGauge';

interface AboutSubsystemProps {
  coords: { x: number; y: number; scale: number; rotation: number };
  data: ProfileSchema;
  isActive: boolean;
  onClick: () => void;
}

export const AboutSubsystem: React.FC<AboutSubsystemProps> = ({
  coords,
  data,
  isActive,
  onClick,
}) => {
  return (
    <ModuleCard
      id="about_subsystem"
      title="Systems Hub & Bio"
      coords={coords}
      status="ONLINE"
      idLabel="SYS.ABOUT"
      isActive={isActive}
      onClick={onClick}
    >
      <div className="space-y-3 font-blueprint text-left">
        <div>
          <span className="text-[8px] text-blueprint-accent/50 block tracking-widest font-bold uppercase">
            EDUCATION_REGISTER
          </span>
          <h4 className="text-blueprint-accent text-[11px] font-bold mt-0.5">
            B.Tech Electronics & Comm. Eng.
          </h4>
          <p className="text-[9px] text-blueprint-text/70">
            Dayananda Sagar University (Class of 2026)
          </p>
        </div>

        <div className="border-t border-blueprint-accent/15 pt-2">
          <span className="text-[8px] text-blueprint-accent/50 block tracking-widest font-bold uppercase mb-1">
            CORE_MISSION_PARAMS
          </span>
          <p className="text-[10px] text-blueprint-text opacity-85 leading-normal font-sans">
            I think in systems, not just lines of code. Specialized in engineering autonomous full-stack software loops, edge ML vision hardware, and quantised offline LLM integrations.
          </p>
        </div>

        <div className="border-t border-blueprint-accent/15 pt-2 space-y-2">
          <TelemetryGauge label="SYSTEMS_INTEGRATION_STABILITY" initialValue={96} />
          <TelemetryGauge label="HW_SW_PARITY_COEFFICIENT" initialValue={88} />
        </div>
      </div>
    </ModuleCard>
  );
};
