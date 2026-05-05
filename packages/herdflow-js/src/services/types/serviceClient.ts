import type { ActionClient, Invoker } from '../../actions/index.js';
import type { EventClient } from '../../events/index.js';
import type { StateClient } from '../../state/index.js';
import type { DescActions, DescEvents, DescState, ServiceDescriptor } from './types.js';

/**
 * Read-only client facade for a `Service`.
 *
 * Exposes the service's state, events, and actions as typed client interfaces —
 * without access to the service's internal implementation or lifecycle methods.
 *
 * Obtained via `service.client`, which is called automatically by `Module`
 * and stored in `module.services`.
 */
export interface ServiceClient<Descriptor extends ServiceDescriptor = ServiceDescriptor> {
  /** Read-only access to the service's name. */
  readonly name: string;

  /** Shorthand for invoking actions on this service from within the implementation. */
  readonly invoke: Invoker<DescActions<Descriptor>>;

  /** Read-only access to the service's reactive state. */
  readonly state: StateClient<DescState<Descriptor>>;

  /** Subscribe to events emitted by the service. */
  readonly events: EventClient<DescEvents<Descriptor>>;

  /** Invoke actions on the service. */
  readonly actions: ActionClient<DescActions<Descriptor>>;
}
