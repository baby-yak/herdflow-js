import type { ActionClient, Invoker } from '../../actions/index.js';
import type { EventClient } from '../../events/index.js';
import type { RemoteStateClient } from '../../state/index.js';
import type { RemoteService } from '../remoteService.js';
import type { DescActions, DescEvents, DescState, ServiceDescriptor } from '../types/types.js';
import { RemoteServiceClient_base } from './remoteServiceClient_base.js';

export class RemoteServiceClient_imp<
  Desc extends ServiceDescriptor = ServiceDescriptor,
> extends RemoteServiceClient_base<Desc> {
  /** Read-only access to the service's name. */
  readonly name: string;

  /** Shorthand for invoking actions on this service from within the implementation. */
  readonly invoke: Invoker<DescActions<Desc>>;

  /** Read-only access to the service's reactive state. */
  readonly state: RemoteStateClient<DescState<Desc>>;

  /** Subscribe to events emitted by the service. */
  readonly events: EventClient<DescEvents<Desc>>;

  /** Invoke actions on the service. */
  readonly actions: ActionClient<DescActions<Desc>>;

  constructor(service: RemoteService<Desc>) {
    super();

    this.name = service.name;
    this.invoke = service.invoke;
    this.state = service.state.client;
    this.events = service.events.client;
    this.actions = service.actions.client;
  }
}
