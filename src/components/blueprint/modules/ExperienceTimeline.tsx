import React from 'react';
import { ModuleCard } from './ModuleCard';
import { ExperienceSchema } from '../../../types/blueprint';

interface ExperienceTimelineProps {
  coords: { x: number; y: number; scale: number; rotation: number };
  data: ExperienceSchema[];
  isActive: boolean;
  onClick: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  coords,
  data,
  isActive,
  onClick,
}) => {
  const exp = data[0];

  return (
    <ModuleCard
      id="experience_timeline"
      title="Timeline Register"
      coords={coords}
      status="ONLINE"
      idLabel="SYS.EXP_TIMELINE"
      isActive={isActive}
      onClick={onClick}
    >
      <div className="space-y-3 font-blueprint text-left">
        {exp && (
          <>
            <div>
              <div className="flex justify-between items-start">
                <h4 className="text-blueprint-accent text-[11px] font-extrabold tracking-wider">
                  {exp.company}
                </h4>
                <span className="text-[7px] text-blueprint-accent/40 bg-blueprint-accent/5 px-1 py-0.5 border border-blueprint-accent/10 rounded-sm">
                  {exp.period}
                </span>
              </div>
              <p className="text-[9px] text-blueprint-accent/70 mt-0.5 uppercase tracking-wider">
                {exp.role}
              </p>
            </div>

            <div className="border-t border-blueprint-accent/15 pt-2">
              <span className="text-[8px] text-blueprint-accent/50 block tracking-widest font-bold uppercase mb-1">
                OPERATIONAL_TASKS
              </span>
              <ul className="space-y-1.5 text-[9px] font-sans text-blueprint-text opacity-90 leading-tight">
                {exp.points.slice(0, 3).map((pt, idx) => (
                  <li key={idx} className="flex gap-1">
                    <span className="text-blueprint-accent font-mono font-bold">→</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-blueprint-accent/15 pt-2 flex flex-wrap gap-1">
              {exp.stack.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 bg-blueprint-accent/10 border border-blueprint-accent/25 text-blueprint-accent text-[8px] tracking-wider rounded-sm font-bold uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </ModuleCard>
  );
};
