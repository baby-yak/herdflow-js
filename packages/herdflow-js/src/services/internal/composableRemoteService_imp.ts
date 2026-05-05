import { RemoteService } from '../remoteService.js';
import type { ComposableRemoteService } from '../types/composableRemoteService.js';
import type { ServiceDescriptor } from '../types/types.js';

export class ComposableRemoteService_imp<Descriptor extends ServiceDescriptor>
  extends RemoteService<Descriptor>
  implements ComposableRemoteService<Descriptor>
{
  onInit?: () => void | Promise<void>;
  onStart?: () => void | Promise<void>;
  onAfterStart?: () => void | Promise<void>;
  onBeforeStop?: () => void | Promise<void>;
  onStop?: () => void | Promise<void>;

  //-------------------------------------------------------
  //-- LIFE CYCLE (used by the module when starting / stopping the services)
  //-------------------------------------------------------

  protected onServiceInit(): void | Promise<void> {
    return this.onInit?.();
  }
  protected onServiceStart(): void | Promise<void> {
    return this.onStart?.();
  }
  protected onServiceAfterStart(): void | Promise<void> {
    return this.onAfterStart?.();
  }
  protected onServiceBeforeStop(): void | Promise<void> {
    return this.onBeforeStop?.();
  }
  protected onServiceStop(): void | Promise<void> {
    return this.onStop?.();
  }
}
