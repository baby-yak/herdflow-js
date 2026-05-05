import { MARKER_MODULE } from '../../core/internal/brandSymbols.js';
import type { ModuleClient, ModuleDescriptor } from '../types/index.js';
import { ModuleClient_base } from './moduleClient_base.js';

export abstract class Module_base<T_Module extends ModuleDescriptor>
  extends ModuleClient_base<T_Module>
  implements ModuleClient<T_Module>
{
  //brand
  readonly [MARKER_MODULE] = true as const;
}
