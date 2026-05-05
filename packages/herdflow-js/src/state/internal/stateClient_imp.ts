import type { StateListener, StateSelectFn } from '../types/types.js';
import type { StateClient } from '../types/stateClient.js';
import { StateClient_base } from './stateClient_base.js';

export class StateClient_imp<S> extends StateClient_base<S> {
  private source: StateClient<S>;

  constructor(source: StateClient<S>) {
    super();
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
