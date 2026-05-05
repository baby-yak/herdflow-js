import { MARKER_REMOTE_STATE_CLIENT } from '../../core/internal/brandSymbols.js';
import type { UnsubscribeFn } from '../../core/types.js';
import type { RemoteStateClient } from '../types/remoteStateClient.js';
import type { StateListener, StateSelectFn } from '../types/types.js';

export abstract class RemoteStateClient_base<S> implements RemoteStateClient<S> {
  //brand
  readonly [MARKER_REMOTE_STATE_CLIENT] = true as const;

  abstract get<U = S>(select?: StateSelectFn<S, U>): Promise<U>;
  abstract subscribe(listener: StateListener<S>): UnsubscribeFn;
  abstract select<U>(selector: StateSelectFn<S, U>): RemoteStateClient<U>;
}
