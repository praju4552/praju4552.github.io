import { LayoutNode } from '../../../types/blueprint';

export const compactMobileLayout: Record<string, LayoutNode> = {
  central_core: {
    id: 'central_core',
    layer: 'core',
    priority: 10,
    anchor: { x: 0, y: 0 },
    offset: { x: 0, y: -650 },
    rotation: 0,
    scale: 0.95,
  },
  about_subsystem: {
    id: 'about_subsystem',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: 0, y: -320 },
    rotation: 0,
    scale: 0.95,
  },
  experience_timeline: {
    id: 'experience_timeline',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: 0, y: 50 },
    rotation: 0,
    scale: 0.95,
  },
  skills_matrix: {
    id: 'skills_matrix',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: 0, y: 460 },
    rotation: 0,
    scale: 0.95,
  },
  projects_engine: {
    id: 'projects_engine',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: 0, y: 920 },
    rotation: 0,
    scale: 0.95,
  },
};
