import { LayoutNode } from '../../../types/blueprint';

export const defaultLayout: Record<string, LayoutNode> = {
  central_core: {
    id: 'central_core',
    layer: 'core',
    priority: 10,
    anchor: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    rotation: 0,
    scale: 1,
  },
  about_subsystem: {
    id: 'about_subsystem',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: -420, y: -260 },
    rotation: 0,
    scale: 1,
  },
  experience_timeline: {
    id: 'experience_timeline',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: 420, y: -260 },
    rotation: 0,
    scale: 1,
  },
  projects_engine: {
    id: 'projects_engine',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: -420, y: 280 },
    rotation: 0,
    scale: 1,
  },
  skills_matrix: {
    id: 'skills_matrix',
    layer: 'subsystem',
    priority: 5,
    anchor: { x: 0, y: 0 },
    offset: { x: 420, y: 280 },
    rotation: 0,
    scale: 1,
  },
};
