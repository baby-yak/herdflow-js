import type { EventClient } from '../../events/index.js';
import type { ReactiveStateClient } from '../../reactiveState/index.js';
import type {
  Module,
  ModuleClient,
  ModuleDescriptor,
  ModuleEvents,
  ModuleServiceClients,
  ModuleState,
} from '../types/types.js';

export class ModuleClient_imp<T_Module extends ModuleDescriptor> implements ModuleClient<T_Module> {
  readonly state: ReactiveStateClient<ModuleState>;
  readonly events: EventClient<ModuleEvents>;
  readonly services: ModuleServiceClients<T_Module>;

  constructor(source: Module<T_Module>) {
    this.state = source.state;
    this.events = source.events;
    this.services = source.services;
  }
}
