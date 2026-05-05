import type { RemoteStateClient } from '../types/remoteStateClient.js';
import type { StateListener, StateSelectFn } from '../types/types.js';
import { RemoteStateClient_base } from './remoteStateClient_base.js';

export class RemoteStateClient_imp<S> extends RemoteStateClient_base<S> {
  private source: RemoteStateClient<S>;

  constructor(source: RemoteStateClient<S>) {
    super();
    this.source = source;
  }

  get<U = S>(select?: StateSelectFn<S, U>): Promise<U> {
    return this.source.get(select);
  }
  subscribe(listener: StateListener<S>) {
    return this.source.subscribe(listener);
  }
  select<U>(selector: StateSelectFn<S, U>) {
    return this.source.select(selector);
  }
}
