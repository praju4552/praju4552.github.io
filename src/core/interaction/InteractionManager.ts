export class InteractionManager {
  private zoom: number = 1.0;
  private panX: number = 0;
  private panY: number = 0;
  private minZoom: number = 0.4;
  private maxZoom: number = 2.5;

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.bindKeyboardEvents();
  }

  public getZoom(): number {
    return this.zoom;
  }

  public getPan(): { x: number; y: number } {
    return { x: this.panX, y: this.panY };
  }

  public setPan(x: number, y: number): void {
    this.panX = x;
    this.panY = y;
    this.notify();
  }

  public handleZoom(delta: number): void {
    // Zoom in or out relative to pointer
    const zoomFactor = 0.05;
    const nextZoom = this.zoom + (delta > 0 ? -zoomFactor : zoomFactor);
    this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, nextZoom));
    this.notify();
  }

  public handlePan(dx: number, dy: number): void {
    this.panX += dx;
    this.panY += dy;
    this.notify();
  }

  public resetViewport(): void {
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  private bindKeyboardEvents(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e) => {
      // Prevent mapping keys if the user is typing in search boxes
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.key) {
        case 'Escape':
          this.resetViewport();
          break;
        case '+':
        case '=':
          this.handleZoom(-1);
          break;
        case '-':
        case '_':
          this.handleZoom(1);
          break;
        case 'ArrowUp':
          this.handlePan(0, 40);
          break;
        case 'ArrowDown':
          this.handlePan(0, -40);
          break;
        case 'ArrowLeft':
          this.handlePan(40, 0);
          break;
        case 'ArrowRight':
          this.handlePan(-40, 0);
          break;
        default:
          break;
      }
    });
  }
}
