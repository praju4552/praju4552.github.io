import React, { useState } from 'react';
import { ModuleCard } from './ModuleCard';
import { ProjectSchema } from '../../../types/blueprint';
import omniRoomData from '../../../data/knowledge/projects/omni_room.json';
import pulseXData from '../../../data/knowledge/projects/pulse_x.json';
import fluidAIData from '../../../data/knowledge/projects/fluid_ai.json';
import predictiveMaintenanceData from '../../../data/knowledge/projects/predictive_maintenance.json';

interface ProjectsEngineProps {
  coords: { x: number; y: number; scale: number; rotation: number };
  isActive: boolean;
  onClick: () => void;
  onSelectProject: (proj: ProjectSchema) => void;
  onInitiateReplay: (proj: ProjectSchema) => void;
}

export const ProjectsEngine: React.FC<ProjectsEngineProps> = ({
  coords,
  isActive,
  onClick,
  onSelectProject,
  onInitiateReplay,
}) => {
  const projectsList: ProjectSchema[] = [
    omniRoomData as ProjectSchema,
    pulseXData as ProjectSchema,
    fluidAIData as ProjectSchema,
    predictiveMaintenanceData as ProjectSchema,
  ];

  const [activeProjIdx, setActiveProjIdx] = useState(0);
  const activeProj = projectsList[activeProjIdx] || null;

  const handleSelect = (idx: number) => {
    setActiveProjIdx(idx);
    const proj = projectsList[idx];
    if (proj) {
      onSelectProject(proj);
    }
  };

  return (
    <ModuleCard
      id="projects_engine"
      title="Exploded Projects register"
      coords={coords}
      status={activeProj?.status || 'ONLINE'}
      idLabel="SYS.PROJECTS"
      isActive={isActive}
      onClick={onClick}
    >
      <div className="space-y-3 font-blueprint text-left">
        <div className="grid grid-cols-4 gap-1">
          {projectsList.map((p, idx) => (
            <button
              key={p.id}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(idx);
              }}
              className={`py-1 text-[7px] font-bold border tracking-wider text-center truncate px-0.5 transition-all ${
                idx === activeProjIdx
                  ? 'bg-blueprint-accent text-blueprint-bg border-blueprint-accent shadow-[0_0_5px_rgba(0,240,255,0.2)]'
                  : 'border-blueprint-accent/15 hover:border-blueprint-accent/30 text-blueprint-accent/60 hover:text-blueprint-accent'
              }`}
            >
              {p.id.substring(0, 5).toUpperCase()}
            </button>
          ))}
        </div>

        {activeProj && (
          <div className="border-t border-blueprint-accent/15 pt-2 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-blueprint-accent text-[11px] font-bold tracking-wider">
                  {activeProj.name}
                </h4>
                <p className="text-[7px] text-blueprint-accent/50 tracking-widest mt-0.5">
                  VERSION: {activeProj.activeVersion} | RELEASE: {activeProj.versions[activeProj.activeVersion]?.releaseDate}
                </p>
              </div>
            </div>

            <p className="text-[10px] text-blueprint-text opacity-85 leading-tight font-sans">
              {activeProj.spec.overview}
            </p>

            <div className="flex flex-wrap gap-1">
              {activeProj.connections.map((t) => (
                <span
                  key={t}
                  className="px-1 py-0.5 bg-blueprint-accent/5 border border-blueprint-accent/15 text-blueprint-accent/70 text-[7px] rounded-sm font-bold uppercase"
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onInitiateReplay(activeProj);
              }}
              className="w-full py-1.5 border border-blueprint-warn/55 hover:bg-blueprint-warn hover:text-blueprint-bg font-bold tracking-widest transition-all duration-300 rounded-sm text-[8px] text-blueprint-warn uppercase"
            >
              [LAUNCH_ENGINEERING_REPLAY]
            </button>
          </div>
        )}
      </div>
    </ModuleCard>
  );
};
