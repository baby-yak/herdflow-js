import type { InferState } from '../state/index.js';
import type { RawStateProvider } from '../state/rawStateProvider.js';
import { RawService_imp } from './internal/rawService_imp.js';
import type { RawService, RawServiceParams } from './rawService.js';
import type { ServiceDescriptor } from './types/types.js';

export type RawFactoryOptions = RawServiceParams & { name?: string };

//-------------------------------------------------------

// infer ServiceDescriptor {state:...} from stateProvider
export function createRawService<SProvider extends RawStateProvider<any>>(
  stateProvider: SProvider,
  options?: RawFactoryOptions,
): RawService<{ state: InferState<SProvider> }, SProvider>;

// explicit ServiceDescriptor
export function createRawService<
  D extends ServiceDescriptor,
  SProvider extends RawStateProvider<D['state']>,
>(stateProvider: SProvider, options?: RawFactoryOptions): RawService<D, SProvider>;

//implementation:

export function createRawService(
  stateProvider: RawStateProvider<any>,
  options?: RawFactoryOptions,
): RawService<any, any> {
  return new RawService_imp(options?.name ?? 'untitled', stateProvider, options);
}
