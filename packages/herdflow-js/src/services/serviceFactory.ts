import type { EMPTY } from '../core/types.js';
import { Service_imp } from './internal/service_imp.js';
import type { Service, ServiceParams } from './service.js';
import type { ServiceDescriptor } from './types/types.js';

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
