import { MARKER_REMOTE_STATE } from '../../core/internal/brandSymbols.js';
import { RemoteStateClient_base } from './remoteStateClient_base.js';

export abstract class RemoteState_base<S> extends RemoteStateClient_base<S> {
  //brand
  readonly [MARKER_REMOTE_STATE] = true as const;
}
