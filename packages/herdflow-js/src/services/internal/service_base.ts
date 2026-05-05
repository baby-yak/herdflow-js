import { MARKER_SERVICE } from '../../core/internal/brandSymbols.js';
import type { ServiceClient } from '../types/serviceClient.js';
import type { ServiceDescriptor } from '../types/types.js';
import { ServiceClient_base } from './serviceClient_base.js';

export abstract class Service_base<Descriptor extends ServiceDescriptor = ServiceDescriptor>
  extends ServiceClient_base<Descriptor>
  implements ServiceClient<Descriptor>
{
  //brand
  readonly [MARKER_SERVICE] = true as const;
}
