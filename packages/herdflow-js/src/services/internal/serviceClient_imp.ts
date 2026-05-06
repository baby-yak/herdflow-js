import type { ActionClient, Invoker } from '../../actions/index.js';
import type { EventClient } from '../../events/index.js';
import type { StateProvider } from '../../state/index.js';
import type { RawService } from '../rawService.js';
import type { ServiceClient } from '../types/serviceClient.js';
import type { DescActions, DescEvents, ServiceDescriptor } from '../types/types.js';
import { MARKER_SERVICE_CLIENT } from './markers.js';

export class ServiceClient_imp<
  T_StateClient = unknown,
  Desc extends ServiceDescriptor = ServiceDescriptor,
> implements ServiceClient<T_StateClient, Desc> {
  [MARKER_SERVICE_CLIENT] = true;
  /** Read-only access to the service's name. */
  readonly name: string;

  /** Shorthand for invoking actions on this service from within the implementation. */
  readonly invoke: Invoker<DescActions<Desc>>;

  /** Read-only access to the service's reactive state. */
  readonly state: T_StateClient;

  /** Subscribe to events emitted by the service. */
  readonly events: EventClient<DescEvents<Desc>>;

  /** Invoke actions on the service. */
  readonly actions: ActionClient<DescActions<Desc>>;

  constructor(service: RawService<StateProvider<T_StateClient>, Desc>) {
    this.name = service.name;
    this.invoke = service.invoke;
    this.state = service.state.client;
    this.events = service.events.client;
    this.actions = service.actions.client;
  }
}
