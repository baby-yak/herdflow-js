import type { ActionClient, Invoker } from '../../actions/index.js';
import { MARKER_REMOTE_SERVICE_CLIENT } from '../../core/internal/brandSymbols.js';
import type { EventClient } from '../../events/index.js';
import type { RemoteStateClient } from '../../state/index.js';
import type { RemoteServiceClient } from '../types/remoteServiceClient.js';
import type { DescActions, DescEvents, DescState, ServiceDescriptor } from '../types/types.js';

export abstract class RemoteServiceClient_base<
  Desc extends ServiceDescriptor = ServiceDescriptor,
> implements RemoteServiceClient<Desc> {
  //brand
  readonly [MARKER_REMOTE_SERVICE_CLIENT] = true as const;

  abstract readonly name: string;
  abstract readonly invoke: Invoker<DescActions<Desc>>;
  abstract readonly state: RemoteStateClient<DescState<Desc>>;
  abstract readonly events: EventClient<DescEvents<Desc>>;
  abstract readonly actions: ActionClient<DescActions<Desc>>;
}
