import { ThemeConfig } from '../../types/blueprint';

export const themeRegistry: Record<string, ThemeConfig> = {
  nasa: {
    id: 'nasa',
    name: 'NASA Technical',
    cssVariables: {
      '--blueprint-bg': '#030914',
      '--blueprint-accent': '#00a8ff',
      '--blueprint-warn': '#eccc68',
      '--blueprint-text': '#f1f2f6',
      '--blueprint-text-dim': '#70a1ff',
      '--blueprint-border': '#2f3542',
      '--blueprint-grid-opacity': '0.15',
      '--blueprint-font': "'JetBrains Mono', monospace",
      '--blueprint-glow-strength': '0 0 10px rgba(0, 168, 255, 0.4)',
    },
  },
  cad_dark: {
    id: 'cad_dark',
    name: 'CAD Cyan (Default)',
    cssVariables: {
      '--blueprint-bg': '#081220',
      '--blueprint-accent': '#00f0ff',
      '--blueprint-warn': '#ff9f43',
      '--blueprint-text': '#ededed',
      '--blueprint-text-dim': '#888888',
      '--blueprint-border': '#132844',
      '--blueprint-grid-opacity': '0.2',
      '--blueprint-font': "'JetBrains Mono', monospace",
      '--blueprint-glow-strength': '0 0 12px rgba(0, 240, 255, 0.5)',
    },
  },
  pcb: {
    id: 'pcb',
    name: 'PCB Green',
    cssVariables: {
      '--blueprint-bg': '#072210',
      '--blueprint-accent': '#ffd32a',
      '--blueprint-warn': '#ff5e57',
      '--blueprint-text': '#ffffff',
      '--blueprint-text-dim': '#2ed573',
      '--blueprint-border': '#0b5223',
      '--blueprint-grid-opacity': '0.25',
      '--blueprint-font': "'JetBrains Mono', monospace",
      '--blueprint-glow-strength': '0 0 15px rgba(255, 211, 42, 0.5)',
    },
  },
  cad_white: {
    id: 'cad_white',
    name: 'CAD White',
    cssVariables: {
      '--blueprint-bg': '#f5f5f5',
      '--blueprint-accent': '#ff3f34',
      '--blueprint-warn': '#ffa801',
      '--blueprint-text': '#1e272e',
      '--blueprint-text-dim': '#808e9b',
      '--blueprint-border': '#d2dae2',
      '--blueprint-grid-opacity': '0.08',
      '--blueprint-font': "'JetBrains Mono', monospace",
      '--blueprint-glow-strength': '0 0 6px rgba(255, 63, 52, 0.2)',
    },
  },
};
