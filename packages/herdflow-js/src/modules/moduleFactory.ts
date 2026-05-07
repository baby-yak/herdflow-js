import { Module_Imp } from './internal/module_imp.js';
import type { Module } from './types/module.js';
import type { ModuleParams, ModuleDescriptor } from './types/types.js';

//-------------------------------------------------------
// two overloads for creating a module - explicit and implicit module descriptor
//-------------------------------------------------------

type Params<M> = {
  services: M;
  options?: ModuleParams;
};

/**
 * create a module with module descriptor type param. the shape will be enforced
 * @example
 * type App = {
 *    server : Service<IServer>, // Service with service descriptor
 *    db : IDatabase,            // shorthand - can also just specify the service descriptor
 * }
 * const app = createModule<App>({
 *  server : new ServerService(),
 *  db : new DatabaseService(),
 * })
 *
 * create a module without module descriptor type param. the shape will be inferred from the services provided\
 * @example
 * const app = createModule({
 *  server : new ServerService(),
 *  db : new DatabaseService(),
 * })
 *
 * @param services name->Service
 * @param params optional construction params
 */
export function createModule<M extends ModuleDescriptor>(
  name?: string,
  params?: Params<M>,
): Module<M>;

export function createModule<M extends ModuleDescriptor>(params?: Params<M>): Module<M>;

export function createModule<M extends ModuleDescriptor>(...args: unknown[]): Module<M> {
  let name: string;
  let params: Params<M>;
  if (typeof args[0] === 'string') {
    name = args[0];
    params = args[1] as Params<M>;
  } else {
    name = 'untitled';
    params = args[0] as Params<M>;
  }

  const { options, services } = params;
  return new Module_Imp(name, services, options);
}
