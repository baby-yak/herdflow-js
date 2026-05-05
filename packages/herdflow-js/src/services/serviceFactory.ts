import { ComposableRemoteService_imp } from './internal/composableRemoteService_imp.js';
import { ComposableService_imp } from './internal/composableService_imp.js';
import type { ComposableRemoteService } from './types/composableRemoteService.js';
import type { ComposableService } from './types/composableService.js';
import type { DescState, ServiceConstructionParams, ServiceDescriptor } from './types/types.js';

/**
 * Creates a service without extending — the compositional alternative to `extends Service<D>`.
 *
 * Returns a `ComposableService` whose lifecycle callbacks (`onInit`, `onStart`, etc.)
 * can be assigned directly as properties after construction.
 *
 * @example
 * const counter = createService<ICounter>('counter', { value: 0 });
 *
 * counter.onInit  = () => { console.log('init'); };
 * counter.onStart = () => { console.log('start'); };
 *
 * counter.actions.setHandler('increment', () => {
 *   counter.state.update(s => { s.value += 1; });
 * });
 *
 * const app = new Module({ counter });
 * await app.start();
 */
export function createService<Descriptor extends ServiceDescriptor = ServiceDescriptor>(
  name: string,
  initialState: DescState<Descriptor>,
  params?: ServiceConstructionParams,
): ComposableService<Descriptor> {
  return new ComposableService_imp<Descriptor>(name, initialState, params);
}

export function createRemoteService<Descriptor extends ServiceDescriptor = ServiceDescriptor>(
  name: string,
  params?: ServiceConstructionParams,
): ComposableRemoteService<Descriptor> {
  return new ComposableRemoteService_imp<Descriptor>(name, params);
}
