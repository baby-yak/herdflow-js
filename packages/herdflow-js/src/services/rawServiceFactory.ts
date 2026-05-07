import type { InferState } from '../state/index.js';
import type { RawStateProvider } from '../state/rawStateProvider.js';
import { RawService_imp } from './internal/rawService_imp.js';
import type { RawService, RawServiceParams } from './rawService.js';
import type { ServiceDescriptor } from './types/types.js';

//-------------------------------------------------------

export type RawFactoryParams<SProvider extends RawStateProvider<any>> = {
  stateProvider: SProvider;
  options?: RawServiceParams;
};

//-------------------------------------------------------

// implicit ServiceDescriptor {state:...} + no name
export function createRawService<SProvider extends RawStateProvider<any>>(
  params: RawFactoryParams<SProvider>,
): RawService<{ state: InferState<SProvider> }, SProvider>;

// implicit ServiceDescriptor {state:...} + name
export function createRawService<SProvider extends RawStateProvider<any>>(
  name: string,
  params: RawFactoryParams<SProvider>,
): RawService<{ state: InferState<SProvider> }, SProvider>;

// explicit ServiceDescriptor + no name
export function createRawService<
  D extends ServiceDescriptor,
  SProvider extends RawStateProvider<any>,
>(params: RawFactoryParams<SProvider>): RawService<D, SProvider>;

// explicit ServiceDescriptor + name
export function createRawService<
  D extends ServiceDescriptor,
  SProvider extends RawStateProvider<any>,
>(name: string, params: RawFactoryParams<SProvider>): RawService<D, SProvider>;

//implementation:

export function createRawService<
  D extends ServiceDescriptor,
  SProvider extends RawStateProvider<any>,
>(...args: unknown[]): RawService<D, SProvider> {
  let name: string;
  let params: RawFactoryParams<SProvider>;

  if (typeof args[0] === 'string') {
    name = args[0];
    params = args[1] as RawFactoryParams<SProvider>;
  } else {
    name = 'untitled';
    params = args[0] as RawFactoryParams<SProvider>;
  }

  const { options, stateProvider } = params;
  return new RawService_imp(name, stateProvider, options);
}
