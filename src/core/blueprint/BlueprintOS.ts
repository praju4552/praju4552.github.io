import { StateMachine } from './StateMachine';
import { KnowledgeGraph } from '../knowledge/KnowledgeGraph';
import { LayoutEngine } from '../layout/LayoutEngine';
import { InteractionManager } from '../interaction/InteractionManager';
import { ThemeEngine } from '../theme/ThemeEngine';
import { SearchEngine } from '../knowledge/SearchEngine';
import { KnowledgeAIEngine } from '../knowledge/AIAdapter';

export class BlueprintOS {
  public fsm: StateMachine;
  public graph: KnowledgeGraph;
  public layout: LayoutEngine;
  public interaction: InteractionManager;
  public theme: ThemeEngine;
  public search: SearchEngine;
  public ai: KnowledgeAIEngine;

  private static instance: BlueprintOS | null = null;

  public static getInstance(): BlueprintOS {
    if (!BlueprintOS.instance) {
      BlueprintOS.instance = new BlueprintOS();
      BlueprintOS.instance.boot();
    }
    return BlueprintOS.instance;
  }

  private constructor() {
    this.fsm = new StateMachine();
    this.graph = new KnowledgeGraph();
    this.layout = new LayoutEngine();
    this.interaction = new InteractionManager();
    this.theme = new ThemeEngine();
    this.search = new SearchEngine(this.graph);
    this.ai = new KnowledgeAIEngine();
  }

  private boot(): void {
    this.fsm.transition({ type: 'BOOT_COMPLETE' });
    // Apply default theme to document body on startup
    if (typeof document !== 'undefined') {
      this.theme.applyTheme('cad_dark');
    }
    this.fsm.transition({ type: 'LOAD_SUCCESS' });
  }
}
