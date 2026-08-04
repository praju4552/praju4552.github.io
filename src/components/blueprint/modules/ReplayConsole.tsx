import React, { useState, useEffect } from 'react';
import { ProjectSchema, ReplayStep } from '../../../types/blueprint';

interface ReplayConsoleProps {
  project: ProjectSchema;
  onStepChange?: (step: ReplayStep | null) => void;
  onClose: () => void;
}

export const ReplayConsole: React.FC<ReplayConsoleProps> = ({
  project,
  onStepChange,
  onClose,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(3000); // 3 seconds per step default

  const steps = project.replay || [];
  const currentStep = steps[currentStepIdx] || null;

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStepIdx, onStepChange, currentStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handlePlayPause = () => {
    if (currentStepIdx >= steps.length - 1 && !isPlaying) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    if (onStepChange) onStepChange(null);
  };

  if (steps.length === 0) {
    return (
      <div className="font-blueprint text-center p-4 text-blueprint-warn">
        NO REPLAY STEPS CONFIGURED FOR PROJECT ID: {project.id}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-blueprint select-none bg-blueprint-bg border border-blueprint-accent/30 p-4 rounded-sm text-xs mt-4">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-blueprint-accent/15 pb-2 mb-3">
        <span className="text-[10px] uppercase font-bold text-blueprint-accent/70 tracking-widest">
          ENGINEERING_REPLAY // PROJECT_STAGE_{currentStepIdx + 1}_OF_{steps.length}
        </span>
        <button
          onClick={onClose}
          className="text-[9px] hover:text-blueprint-accent text-blueprint-accent/40 border border-blueprint-accent/10 px-1.5 py-0.5 rounded-sm hover:bg-blueprint-accent/5 transition-all"
        >
          [EXIT_REPLAY]
        </button>
      </div>

      {/* Dynamic Content Frame */}
      {currentStep && (
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-start">
            <h4 className="text-blueprint-accent text-sm font-bold tracking-wider">
              {currentStep.stage}. {currentStep.title}
            </h4>
            <div className="flex gap-1">
              {currentStep.technologies.map((t) => (
                <span
                  key={t}
                  className="px-1 py-0.5 bg-blueprint-accent/10 text-blueprint-accent border border-blueprint-accent/20 rounded-sm text-[8px] tracking-wide uppercase font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-blueprint-text opacity-85 leading-relaxed text-[11px]">
            {currentStep.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t border-blueprint-accent/10 pt-2 text-[10px]">
            <div className="p-2 border border-blueprint-accent/5 bg-blueprint-accent/[0.02]">
              <span className="text-blueprint-accent opacity-60 uppercase tracking-widest block font-bold text-[8px] mb-1">
                DECISION
              </span>
              <p className="text-blueprint-text/90 leading-normal">{currentStep.decisions}</p>
            </div>
            <div className="p-2 border border-blueprint-accent/5 bg-blueprint-accent/[0.02]">
              <span className="text-blueprint-warn opacity-60 uppercase tracking-widest block font-bold text-[8px] mb-1">
                CHALLENGE
              </span>
              <p className="text-blueprint-text/90 leading-normal">{currentStep.challenges}</p>
            </div>
            <div className="p-2 border border-blueprint-accent/5 bg-blueprint-accent/[0.02]">
              <span className="text-emerald-400 opacity-60 uppercase tracking-widest block font-bold text-[8px] mb-1">
                LESSON
              </span>
              <p className="text-blueprint-text/90 leading-normal">{currentStep.lessons}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Timeline Nodes */}
      <div className="flex items-center gap-1 mb-4">
        {steps.map((s, idx) => (
          <div
            key={idx}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(idx);
            }}
            className={`h-1.5 flex-1 rounded-sm cursor-pointer border transition-all duration-300 ${
              idx === currentStepIdx
                ? 'bg-blueprint-accent border-blueprint-accent shadow-[0_0_8px_rgba(0,240,255,0.4)]'
                : idx < currentStepIdx
                ? 'bg-blueprint-accent/30 border-blueprint-accent/40'
                : 'bg-blueprint-accent/5 border-blueprint-accent/10 hover:border-blueprint-accent/30'
            }`}
          />
        ))}
      </div>

      {/* Playback Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-blueprint-accent/15">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={currentStepIdx === 0}
            className="px-2.5 py-1 border border-blueprint-accent/20 hover:border-blueprint-accent text-blueprint-accent rounded-sm disabled:opacity-30 disabled:pointer-events-none hover:bg-blueprint-accent/5 transition-all text-[10px]"
          >
            ◀ BACK
          </button>
          <button
            onClick={handlePlayPause}
            className="px-3.5 py-1 bg-blueprint-accent text-blueprint-bg font-bold rounded-sm hover:bg-blueprint-accent/90 transition-all text-[10px]"
          >
            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIdx === steps.length - 1}
            className="px-2.5 py-1 border border-blueprint-accent/20 hover:border-blueprint-accent text-blueprint-accent rounded-sm disabled:opacity-30 disabled:pointer-events-none hover:bg-blueprint-accent/5 transition-all text-[10px]"
          >
            NEXT ▶
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 text-blueprint-accent/50 hover:text-blueprint-accent transition-all text-[10px]"
          >
            ⏹ RESET
          </button>
        </div>

        <div className="flex items-center gap-2 text-[9px] text-blueprint-accent/60">
          <span>SPEED:</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-blueprint-bg border border-blueprint-accent/25 text-blueprint-accent text-[9px] px-1 py-0.5 rounded-sm outline-none font-blueprint"
          >
            <option value="5000">SLOW (5s)</option>
            <option value="3000">NORMAL (3s)</option>
            <option value="1500">FAST (1.5s)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
