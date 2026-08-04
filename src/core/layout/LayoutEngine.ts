import { LayoutNode } from '../../types/blueprint';
import { defaultLayout } from './configs/defaultLayout';
import { compactMobileLayout } from './configs/compactMobile';

export class LayoutEngine {
  private isMobile: boolean = false;

  constructor() {
    this.updateScreenDimensions();
  }

  public updateScreenDimensions(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 1024;
    }
  }

  public getLayoutPreset(): Record<string, LayoutNode> {
    return this.isMobile ? compactMobileLayout : defaultLayout;
  }

  public getIsMobile(): boolean {
    return this.isMobile;
  }

  public computePosition(
    nodeId: string,
    explodeFactor: number, // 0.0 to 1.0
    activeNodeId: string | null
  ): { x: number; y: number; scale: number; rotation: number } {
    const preset = this.getLayoutPreset();
    const config = preset[nodeId];

    if (!config) {
      return { x: 0, y: 0, scale: 1, rotation: 0 };
    }

    // Calculate explosion offsets.
    // In assembled mode (explodeFactor = 0), they transition back towards the center core.
    let targetX = config.anchor.x + (config.offset.x * explodeFactor);
    let targetY = config.anchor.y + (config.offset.y * explodeFactor);
    let targetScale = config.scale;

    // If a specific module is selected, focus it and scale down the others
    if (activeNodeId) {
      if (activeNodeId === nodeId) {
        targetScale = config.scale * 1.08;
      } else {
        targetScale = config.scale * 0.85;
        // Shift non-selected elements slightly outward/inward to create focus parallax
        const dx = config.offset.x;
        const dy = config.offset.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 0) {
          targetX += (dx / len) * 20;
          targetY += (dy / len) * 20;
        }
      }
    }

    return {
      x: targetX,
      y: targetY,
      scale: targetScale,
      rotation: config.rotation,
    };
  }
}
