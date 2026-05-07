import type { EMPTY } from '../core/types.js';
import type { InferState } from '../state/index.js';
import type { RawStateProvider } from '../state/rawStateProvider.js';
import { RawService_imp } from './internal/rawService_imp.js';
import { Service_imp } from './internal/service_imp.js';
import type { RawService, RawServiceParams } from './rawService.js';
import type { Service, ServiceParams } from './service.js';
import type { ServiceDescriptor } from './types/types.js';

//-------------------------------------------------------
//-- RAW
//-------------------------------------------------------

type RawFactoryParams<SProvider extends RawStateProvider<any>> = {
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

//SERVICE

//-------------------------------------------------------
//-- Service
//-------------------------------------------------------

type ServiceFactoryParams<S> = {
  initialState: S;
  options?: ServiceParams;
};

type ServiceFactoryParamsEmpty = {
  initialState?: never;
  options?: ServiceParams;
};

//-------------------------------------------------------

// no state + no name
export function createService(params?: ServiceFactoryParamsEmpty): Service<EMPTY>;
// no state + name
export function createService(name: string, params?: ServiceFactoryParamsEmpty): Service<EMPTY>;

// implicit ServiceDescriptor {state:S} + no name
export function createService<S>(params: ServiceFactoryParams<S>): Service<{ state: S }>;
// implicit ServiceDescriptor {state:S} + name
export function createService<S>(
  name: string,
  params: ServiceFactoryParams<S>,
): Service<{ state: S }>;

// explicit ServiceDescriptor + no name
export function createService<D extends ServiceDescriptor>(
  params: ServiceFactoryParams<D['state']>,
): Service<D>;
// explicit ServiceDescriptor + name
export function createService<D extends ServiceDescriptor>(
  name: string,
  params: ServiceFactoryParams<D['state']>,
): Service<D>;

//implementation:

export function createService<D extends ServiceDescriptor, S>(...args: unknown[]): Service<D> {
  let name: string;
  let params: ServiceFactoryParams<S> | undefined;

  if (typeof args[0] === 'string') {
    name = args[0];
    params = args[1] as ServiceFactoryParams<S> | undefined;
  } else {
    name = 'untitled';
    params = args[0] as ServiceFactoryParams<S> | undefined;
  }

  return new Service_imp(name, params?.initialState, params?.options);
}
