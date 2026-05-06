import { ActionExecuter, type Invoker } from '../actions/index.js';
import { EventEmitter } from '../events/index.js';
import type { ModuleClient, ModuleDescriptor } from '../modules/index.js';
import type { StateProvider } from '../state/index.js';
import { MARKER_SERVICE } from './internal/markers.js';
import { ServiceClient_imp } from './internal/serviceClient_imp.js';
import { _SERVICE_LIFECYCLE_ } from './internal/types.js';
import type { ServiceClient } from './types/serviceClient.js';
import type {
  DescActions,
  DescEvents,
  ServiceConstructionParams,
  ServiceDescriptor,
} from './types/types.js';

export abstract class RawService<
  T_StateProvider extends StateProvider<unknown>,
  Descriptor extends ServiceDescriptor,
> {
  [MARKER_SERVICE] = true;

  private _module: ModuleClient | undefined;

  readonly name: string;

  /** Reactive state — read and update the service's internal state. */
  readonly state: T_StateProvider;

  /** Typed event emitter — emit and listen to service events internally. */
  readonly events: EventEmitter<DescEvents<Descriptor>>;

  /** Returns a read-only `ServiceClient` exposing state, events, and actions to external consumers. */
  readonly client: ServiceClient<T_StateProvider['client'], Descriptor>;

  /**
   * Action executer — register handlers via `setHandler`.
   * Use `this.invoke` to call actions internally.
   */
  readonly actions: ActionExecuter<DescActions<Descriptor>>;

  /** Shorthand for invoking actions on this service from within the implementation. */
  readonly invoke: Invoker<DescActions<Descriptor>>;

  // Bridge — only Module imports and uses this symbol
  [_SERVICE_LIFECYCLE_] = {
    setModule: (module: ModuleClient) => this.setModule(module),
    init: () => this.onServiceInit(),
    start: () => this.onServiceStart(),
    afterStart: () => this.onServiceAfterStart(),
    beforeStop: () => this.onServiceBeforeStop(),
    stop: () => this.onServiceStop(),
  };

  constructor(name: string, stateProvider: T_StateProvider, params?: ServiceConstructionParams) {
    this.name = name;
    this.state = stateProvider;
    this.events = new EventEmitter<DescEvents<Descriptor>>(params?.events);
    this.actions = new ActionExecuter<DescActions<Descriptor>>(params?.actions);
    this.invoke = this.actions.invoke;

    this.client = new ServiceClient_imp<T_StateProvider['client'], Descriptor>(this);
  }

  /**
   * Returns the parent `ModuleClient`, cast to the provided module descriptor type.
   *
   * Available from `onServiceStart` onward — throws if called earlier (constructor or `onServiceInit`).
   * Use a private getter to cache access and avoid repeating the cast:
   *
   * ```ts
   * private get module() { return this.getModule<AppModule>(); }
   * ```
   *
   * @throws if called before `onServiceStart`
   */
  getModule<M extends ModuleDescriptor>(): ModuleClient<M> {
    if (!this._module) {
      throw new Error(
        `[${this.constructor.name}] getModule() called before onServiceStart — module is not yet available`,
      );
    }
    return this._module as ModuleClient<M>;
  }

  //-------------------------------------------------------
  //-- LIFE CYCLE (used by the module when starting / stopping the services)
  //-------------------------------------------------------

  /** module is injecting itself - happens after init  */
  private setModule(module: ModuleClient) {
    this._module = module;
  }

  /** Called first during `module.start()`. Use for standalone setup (DB connect, config load, etc.). */
  onServiceInit(): void | Promise<void> {}
  /** Called after all services have initialized. Safe for cross-service wiring — listeners, state reads, action calls. */
  onServiceStart(): void | Promise<void> {}
  /** Called after all services have started. Use for final setup that depends on all services being fully running. */
  onServiceAfterStart(): void | Promise<void> {}
  /** Called first during `module.stop()`, while all services are still live. Use for cross-service ops before teardown. */
  onServiceBeforeStop(): void | Promise<void> {}
  /** Called after all services have completed `onBeforeStop`. Use for standalone teardown — close connections, unregister listeners. */
  onServiceStop(): void | Promise<void> {}
}
