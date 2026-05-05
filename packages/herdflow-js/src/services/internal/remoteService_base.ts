import { MARKER_REMOTE_SERVICE } from '../../core/internal/brandSymbols.js';
import type { ServiceDescriptor } from '../types/types.js';
import { RemoteServiceClient_base } from './remoteServiceClient_base.js';

export abstract class RemoteService_base<
  Descriptor extends ServiceDescriptor = ServiceDescriptor,
> extends RemoteServiceClient_base<Descriptor> {
  //brand
  readonly [MARKER_REMOTE_SERVICE] = true as const;
}
