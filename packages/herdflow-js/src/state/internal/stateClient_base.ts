import { MARKER_STATE_CLIENT } from '../../core/internal/brandSymbols.js';
import type { UnsubscribeFn } from '../../core/types.js';
import type { StateListener, StateSelectFn } from '../types/types.js';
import type { StateClient } from '../types/stateClient.js';

export abstract class StateClient_base<S> implements StateClient<S> {
  //brand
  readonly [MARKER_STATE_CLIENT] = true as const;

  abstract get<U = S>(select?: StateSelectFn<S, U>): U;
  abstract getInitialState<U = S>(select?: StateSelectFn<S, U>): U;
  abstract subscribe(listener: StateListener<S>): UnsubscribeFn;
  abstract select<U>(selector: StateSelectFn<S, U>): StateClient<U>;
}
