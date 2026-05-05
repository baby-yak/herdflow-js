import type { StateClient } from '../types/stateClient.js';
import type { StateListener, StateSelectFn } from '../types/types.js';

export class StateClient_imp<S> implements StateClient<S> {
  private source: StateClient<S>;

  constructor(source: StateClient<S>) {
    this.source = source;
  }

  get<U = S>(select?: StateSelectFn<S, U>): U {
    return this.source.get(select);
  }
  getInitialState<U = S>(select?: StateSelectFn<S, U>): U {
    return this.source.getInitialState(select);
  }
  subscribe(listener: StateListener<S>) {
    return this.source.subscribe(listener);
  }
  select<U>(selector: StateSelectFn<S, U>) {
    return this.source.select(selector);
  }
}
