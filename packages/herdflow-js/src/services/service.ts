import { ReactiveState } from '../reactiveState/reactiveState.js';
import { RawService } from './rawService.js';
import type { ServiceConstructionParams, ServiceDescriptor } from './types/types.js';

/**
 * default service implementation - in memory state with the {@link ReactiveState}  provider.
 */
export class Service<Descriptor extends ServiceDescriptor> extends RawService<
  ReactiveState<Descriptor['state']>,
  Descriptor
> {
  constructor(name: string, initialState: Descriptor['state'], params?: ServiceConstructionParams) {
    super(name, new ReactiveState<Descriptor['state']>(initialState), params);
  }
}
