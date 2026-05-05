import type { UnsubscribeFn } from '../../core/types.js';
import type { RemoteStateClient } from '../types/remoteStateClient.js';
import type { StateListener, StateSelectFn } from '../types/types.js';
import { RemoteStateClient_base } from './remoteStateClient_base.js';

export class RemoteStateSelector_imp<S, U> extends RemoteStateClient_base<U> {
  private source: RemoteStateClient<S>;
  private fn: StateSelectFn<S, U>;

  constructor(source: RemoteStateClient<S>, fn: StateSelectFn<S, U>) {
    super();

    this.source = source;
    this.fn = fn;
  }

  async get<W = U>(select?: StateSelectFn<U, W>): Promise<W> {
    if (select) {
      // chain stored and provided select functions S=>U=>W
      const chain = (state: S) => select(this.fn(state));
      return this.source.get(chain);
    } else {
      // cast
      const noChain = (state: S) => this.fn(state) as unknown as W;
      return this.source.get(noChain);
    }
  }
  subscribe(listener: StateListener<U>): UnsubscribeFn {
    let prev: U | undefined = undefined;

    return this.source.subscribe((state) => {
      // no change on selected value - NOOP
      // (do run first time though)

      const selected = this.fn(state);

      if (prev !== undefined && Object.is(prev, selected)) {
        return;
      }

      listener(selected, prev);
      prev = selected;
    });
  }
  select<W>(selector: StateSelectFn<U, W>): RemoteStateClient<W> {
    const fn: StateSelectFn<S, W> = (state) => {
      const sub = this.fn(state);
      return selector(sub);
    };
    return new RemoteStateSelector_imp(this.source, fn);
  }
}
