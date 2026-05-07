import type { EMPTY } from '../core/types.js';
import { Service_imp } from './internal/service_imp.js';
import type { Service, ServiceParams } from './service.js';
import type { ServiceDescriptor } from './types/types.js';

export type ServiceFactoryOptions = ServiceParams & { name?: string };

//-------------------------------------------------------

// no state
export function createService(state?: undefined, options?: ServiceFactoryOptions): Service<EMPTY>;

// infer S from state
export function createService<S>(state: S, options?: ServiceFactoryOptions): Service<{ state: S }>;

// explicit ServiceDescriptor
export function createService<D extends ServiceDescriptor>(
  state: D['state'],
  options?: ServiceFactoryOptions,
): Service<D>;

//implementation:

export function createService(...args: unknown[]): Service<any> {
  const state = args[0];
  const options = args[1] as ServiceFactoryOptions | undefined;
  return new Service_imp(options?.name ?? 'untitled', state, options);
}
