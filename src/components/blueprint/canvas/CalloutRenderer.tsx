import React from 'react';
import { motion } from 'framer-motion';
import { ConnectionSchema } from '../../../types/blueprint';
import connectionsData from '../../../data/knowledge/connections.json';

interface CalloutRendererProps {
  nodePositions: Record<string, { x: number; y: number }>;
  activeNodeId: string | null;
}

export const CalloutRenderer: React.FC<CalloutRendererProps> = ({
  nodePositions,
  activeNodeId,
}) => {
  const connections = connectionsData as ConnectionSchema[];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      <defs>
        <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <marker
          id="tech-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" className="fill-current text-blueprint-accent" />
        </marker>
      </defs>

      {connections.map((conn, idx) => {
        const start = nodePositions[conn.source];
        const end = nodePositions[conn.target];

        if (!start || !end) return null;

        const isRelated =
          activeNodeId === null ||
          activeNodeId === conn.source ||
          activeNodeId === conn.target;

        const midX = (start.x + end.x) / 2;
        const pathData = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;

        const labelX = midX;
        const labelY = (start.y + end.y) / 2;

        return (
          <g key={`conn-${idx}`} className="transition-opacity duration-300" style={{ opacity: isRelated ? 1.0 : 0.15 }}>
            <path
              d={pathData}
              fill="none"
              stroke="var(--blueprint-accent)"
              strokeWidth="3"
              className="opacity-10 filter blur-[2px]"
            />

            <motion.path
              d={pathData}
              fill="none"
              stroke="var(--blueprint-accent)"
              strokeWidth="1.2"
              markerEnd="url(#tech-arrow)"
              strokeDasharray={conn.dashArray || 'none'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
            />

            <circle cx={start.x} cy={start.y} r="3" fill="var(--blueprint-accent)" />
            <circle cx={end.x} cy={end.y} r="3" fill="var(--blueprint-accent)" />

            {isRelated && (
              <g style={{ transform: `translate(${labelX}px, ${labelY}px)` }} className="font-blueprint text-[8px]">
                <rect
                  x="-55"
                  y="-8"
                  width="110"
                  height="16"
                  fill="var(--blueprint-bg)"
                  stroke="var(--blueprint-accent)"
                  strokeWidth="0.5"
                  className="opacity-80"
                  rx="2"
                />
                <text
                  textAnchor="middle"
                  y="2"
                  className="fill-current text-blueprint-accent font-bold tracking-widest uppercase"
                >
                  {conn.busType} | {conn.bandwidth}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};
