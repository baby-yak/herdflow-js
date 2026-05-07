import { Module_Imp } from './internal/module_imp.js';
import type { Module } from './types/module.js';
import type { ModuleDescriptor, ModuleParams } from './types/types.js';

export type ModuleFactoryOptions = ModuleParams & { name?: string };

//-------------------------------------------------------

export function createModule<M extends ModuleDescriptor>(
  services: M,
  options?: ModuleFactoryOptions,
): Module<M> {
  return new Module_Imp(options?.name ?? 'untitled', services, options);
}
