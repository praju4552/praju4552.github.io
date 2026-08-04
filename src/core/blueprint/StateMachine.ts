import { FSMState, FSMEvent } from '../../types/blueprint';

type StateTransitionMap = {
  [K in FSMState]?: {
    [E in FSMEvent['type']]?: (event: Extract<FSMEvent, { type: E }>) => FSMState;
  };
};

export class StateMachine {
  private currentState: FSMState = 'BOOT';
  private listeners: Set<(state: FSMState) => void> = new Set();

  private transitions: StateTransitionMap = {
    BOOT: {
      BOOT_COMPLETE: () => 'INITIALIZING',
    },
    INITIALIZING: {
      LOAD_SUCCESS: () => 'ASSEMBLED',
    },
    ASSEMBLED: {
      TRIGGER_EXPLODE: () => 'EXPLODING',
    },
    EXPLODING: {
      EXPLODE_COMPLETE: () => 'EXPLODED',
      TRIGGER_ASSEMBLE: () => 'ASSEMBLED',
    },
    EXPLODED: {
      TRIGGER_ASSEMBLE: () => 'ASSEMBLED',
      SELECT_PROJECT: () => 'PROJECT_SELECTED',
      SELECT_MODULE: () => 'MODULE_SELECTED',
    },
    PROJECT_SELECTED: {
      TRIGGER_ASSEMBLE: () => 'ASSEMBLED',
      SELECT_PROJECT: (e) => e.id ? 'PROJECT_SELECTED' : 'EXPLODED',
      OPEN_DETAIL: () => 'DETAIL_VIEW',
      TRIGGER_EXPLODE: () => 'EXPLODED',
    },
    MODULE_SELECTED: {
      TRIGGER_ASSEMBLE: () => 'ASSEMBLED',
      SELECT_MODULE: (e) => e.id ? 'MODULE_SELECTED' : 'EXPLODED',
      OPEN_DETAIL: () => 'DETAIL_VIEW',
      TRIGGER_EXPLODE: () => 'EXPLODED',
    },
    DETAIL_VIEW: {
      CLOSE_DETAIL: () => 'RETURNING',
      TRIGGER_ASSEMBLE: () => 'ASSEMBLED',
    },
    RETURNING: {
      RETURN_COMPLETE: () => 'EXPLODED',
      TRIGGER_ASSEMBLE: () => 'ASSEMBLED',
    },
  };

  public getState(): FSMState {
    return this.currentState;
  }

  public transition(event: FSMEvent): boolean {
    const stateConfig = this.transitions[this.currentState];
    if (!stateConfig) return false;

    const transitionFn = stateConfig[event.type] as any;
    if (!transitionFn) {
      console.warn(`[FSM] Invalid event ${event.type} in state ${this.currentState}`);
      return false;
    }

    const nextState = transitionFn(event);
    if (nextState !== this.currentState) {
      console.log(`[FSM] State changed: ${this.currentState} -> ${nextState} (Event: ${event.type})`);
      this.currentState = nextState;
      this.notify();
      return true;
    }
    return false;
  }

  public subscribe(listener: (state: FSMState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.currentState));
  }
}
