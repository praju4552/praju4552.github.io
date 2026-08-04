import React, { useState } from 'react';
import { ModuleCard } from './ModuleCard';
import { SkillGroupSchema } from '../../../types/blueprint';

interface SkillsMatrixProps {
  coords: { x: number; y: number; scale: number; rotation: number };
  data: SkillGroupSchema[];
  isActive: boolean;
  onClick: () => void;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({
  coords,
  data,
  isActive,
  onClick,
}) => {
  const [activeGroupIdx, setActiveGroupIdx] = useState(0);
  const activeGroup = data[activeGroupIdx] || null;

  return (
    <ModuleCard
      id="skills_matrix"
      title="Capability Database"
      coords={coords}
      status="ONLINE"
      idLabel="SYS.SKILL_MATRIX"
      isActive={isActive}
      onClick={onClick}
    >
      <div className="space-y-3 font-blueprint text-left">
        <div className="grid grid-cols-3 gap-1">
          {data.map((sg, idx) => (
            <button
              key={sg.num}
              onClick={(e) => {
                e.stopPropagation();
                setActiveGroupIdx(idx);
              }}
              className={`py-1 text-[8px] font-bold border tracking-wider text-center transition-all ${
                idx === activeGroupIdx
                  ? 'bg-blueprint-accent text-blueprint-bg border-blueprint-accent'
                  : 'border-blueprint-accent/15 hover:border-blueprint-accent/30 text-blueprint-accent/60 hover:text-blueprint-accent'
              }`}
            >
              C.{sg.num}
            </button>
          ))}
        </div>

        {activeGroup && (
          <div className="border-t border-blueprint-accent/15 pt-2">
            <span className="text-[8px] text-blueprint-accent/50 block tracking-widest font-bold uppercase mb-1.5">
              SECTOR_{activeGroup.num}: {activeGroup.cat}
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-[120px] overflow-y-auto pr-1">
              {activeGroup.items.map((item) => (
                <div
                  key={item}
                  className="px-1.5 py-1 bg-blueprint-accent/[0.03] border border-blueprint-accent/10 hover:border-blueprint-accent/35 rounded-sm text-[9px] text-blueprint-text tracking-wide truncate transition-all font-mono font-bold capitalize"
                >
                  :: {item.replace('_', ' ')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ModuleCard>
  );
};
