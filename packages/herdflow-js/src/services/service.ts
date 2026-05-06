import type { ReactiveStateParams } from '../reactiveState/index.js';
import { ReactiveState } from '../reactiveState/reactiveState.js';
import { RawService, type RawServiceParams } from './rawService.js';
import type { ServiceDescriptor } from './types/types.js';

export type ServiceParams = RawServiceParams & {
  state?: ReactiveStateParams;
};

/**
 * default service implementation - in memory state with the {@link ReactiveState}  provider.
 */
export class Service<Descriptor extends ServiceDescriptor> extends RawService<
  ReactiveState<Descriptor['state']>,
  Descriptor
> {
  constructor(name: string, initialState: Descriptor['state'], params?: ServiceParams) {
    const provider = new ReactiveState<Descriptor['state']>(initialState, params?.state);
    super(name, provider, params);
  }
}
