import { ReactiveState } from '../reactiveState/reactiveState.js';
import { BaseService } from './_baseService.js';
import type { ServiceConstructionParams, ServiceDescriptor } from './types/types.js';

export abstract class Service<
  Descriptor extends ServiceDescriptor = ServiceDescriptor,
> extends BaseService<ReactiveState<Descriptor['state']>, Descriptor> {
  constructor(name: string, initialState: Descriptor['state'], params?: ServiceConstructionParams) {
    super(name, new ReactiveState(initialState), params);    
  }
}
