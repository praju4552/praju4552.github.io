export type FSMState =
  | 'BOOT'
  | 'INITIALIZING'
  | 'ASSEMBLED'
  | 'EXPLODING'
  | 'EXPLODED'
  | 'PROJECT_SELECTED'
  | 'MODULE_SELECTED'
  | 'DETAIL_VIEW'
  | 'RETURNING';

export type FSMEvent =
  | { type: 'BOOT_COMPLETE' }
  | { type: 'LOAD_SUCCESS' }
  | { type: 'TRIGGER_EXPLODE' }
  | { type: 'EXPLODE_COMPLETE' }
  | { type: 'TRIGGER_ASSEMBLE' }
  | { type: 'SELECT_PROJECT'; id: string }
  | { type: 'SELECT_MODULE'; id: string }
  | { type: 'OPEN_DETAIL' }
  | { type: 'CLOSE_DETAIL' }
  | { type: 'RETURN_COMPLETE' };

export interface TechnologySchema {
  id: string;
  name: string;
  category: string;
  documentation?: string;
  interviewQuestions?: Array<{ q: string; a: string }>;
}

export interface ReplayStep {
  stage: number;
  title: string;
  description: string;
  decisions: string;
  challenges: string;
  lessons: string;
  technologies: string[]; // references technology.id
}

export interface SubsystemSchema {
  id?: string;
  name: string;
  function: string;
  technologies: string[];
}

export interface ProjectSchema {
  id: string;
  name: string;
  status: 'ONLINE' | 'DIAGNOSTIC' | 'ERROR';
  activeVersion: string;
  versions: Record<string, { releaseDate: string; changelog: string }>;
  connections: string[]; // references technology.id
  spec: {
    overview: string;
    architecture: string;
    subsystems: SubsystemSchema[];
    challenges: string;
    engineeringDecisions: string;
    lessonsLearned: string;
    futureImprovements: string;
    interviewQuestions?: Array<{ q: string; a: string }>;
  };
  replay: ReplayStep[];
}

export interface ProfileSchema {
  name: string;
  role: string;
  location: string;
  metrics: Array<{ label: string; value: string }>;
}

export interface ExperienceSchema {
  id: string;
  company: string;
  role: string;
  period: string;
  points: string[];
  stack: string[]; // references technology.id
}

export interface SkillGroupSchema {
  num: string;
  cat: string;
  items: string[]; // references technology.id
}

export interface ConnectionSchema {
  source: string;
  target: string;
  busType: string;
  bandwidth: string;
  colorToken: string;
  dashArray?: string;
}

export interface MetricSchema {
  id: string;
  label: string;
  value: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  cssVariables: {
    '--blueprint-bg': string;
    '--blueprint-accent': string;
    '--blueprint-warn': string;
    '--blueprint-text': string;
    '--blueprint-text-dim': string;
    '--blueprint-border': string;
    '--blueprint-grid-opacity': string;
    '--blueprint-font': string;
    '--blueprint-glow-strength': string;
  };
}

export interface LayoutNode {
  id: string;
  layer: 'core' | 'subsystem' | 'peripheral';
  priority: number;
  anchor: { x: number; y: number };
  offset: { x: number; y: number };
  rotation: number;
  scale: number;
}
