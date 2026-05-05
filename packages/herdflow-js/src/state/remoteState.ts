import { enableMapSet } from 'immer';
import type { UnsubscribeFn } from '../core/types.js';
import { RemoteState_base } from './internal/remoteState_base.js';
import { RemoteStateClient_imp } from './internal/remoteStateClient_imp.js';
import { RemoteStateSelector_imp } from './internal/remoteStateSelector_imp.js';
import type { RemoteStateClient } from './types/remoteStateClient.js';
import {
  type StateConstructionParams,
  type StateListener,
  type StateSelectFn,
} from './types/types.js';

//-------------------------------------------------------
// -- enables immer Map/Set support globally — see README
enableMapSet();

//-------------------------------------------------------
//-- types

type ListenerContainer<S> = {
  listener: StateListener<S>;
};

const DEFAULT_OPTIONS: Required<StateConstructionParams> = {
  listenersErrorHandling: 'warn',
};

/**
 * Reactive state container backed by [immer](https://immerjs.github.io/immer/).
 *
 * The default choice. Use `update(draft => { ... })` to mutate state deeply
 * without writing spread boilerplate — immer handles structural sharing under
 * the hood. `update({ field })` is available as a shorthand shallow merge.
 *
 * Use `updatePure()` for explicit immutable updates without immer recipes.
 *
 * @example
 * ```ts
 * const state = new ReactiveState({ count: 0 });
 * state.update(draft => { draft.count++; });
 * ```
 */
export class RemoteState<S> extends RemoteState_base<S> {
  private _listeners: ListenerContainer<S>[];
  private _options: Required<StateConstructionParams>;
  private _prev: S | undefined;

  /** the state owner has to implement this one */
  private _remoteStateGetter: (<U>(select?: StateSelectFn<S, U>) => Promise<U>) | undefined;

  /**
   * Returns a {@link RemoteStateClient} facade that exposes only the read-only interface.
   * Safe to hand to consumers that should not be able to mutate state.
   */
  readonly client: RemoteStateClient<S>;

  constructor(options?: StateConstructionParams) {
    super();

    this._listeners = [];
    this._options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.client = new RemoteStateClient_imp(this);
  }

  registerStateHandler(handler: (<U>(select?: StateSelectFn<S, U>) => Promise<U>) | undefined) {
    this._remoteStateGetter = handler;
  }

  async get<U = S>(select?: StateSelectFn<S, U>): Promise<U> {
    if (!this._remoteStateGetter) {
      throw new Error(
        'state getter not provided by state owner. did you forget to call `state.registerStateHandler()` ?',
      );
    }
    return this._remoteStateGetter(select);
  }

  push(state: S): void {
    //NOTE: dont check again prev equality. this might be a patch on existing state
    const listeners = [...this._listeners];
    for (const container of listeners) {
      container.listener(state, this._prev);
    }
    this._prev = state;
  }

  subscribe(listener: StateListener<S>): UnsubscribeFn {
    const safeListener: StateListener<S> = (state, prev) => {
      try {
        listener(state, prev);
      } catch (error) {
        this._handleListenerException(error);
      }
    };
    const container: ListenerContainer<S> = { listener: safeListener };
    this._listeners.push(container);

    // TODO: dont send existing state ? ... will be handled by ? ... hmm
    // safeListener(this.get(), undefined);

    return () => {
      this._listeners = this._listeners.filter((x) => x !== container);
    };
  }

  select<U>(selector: StateSelectFn<S, U>): RemoteStateClient<U> {
    return new RemoteStateSelector_imp(this, selector);
  }

  //-------------------------------------------------------
  //-- helpers
  //-------------------------------------------------------

  private _handleListenerException(err: unknown) {
    const handling = this._options.listenersErrorHandling;

    if (handling === 'throw') {
      throw err;
    }

    if (typeof handling === 'function') {
      handling(err);
      return;
    }

    const msg = `[${this.constructor.name}] listener error`;

    switch (handling) {
      case 'ignore':
        break;
      case 'log':
        console.log(msg, err);
        break;
      case 'warn':
        console.warn(msg, err);
        break;
      case 'error':
        console.error(msg, err);
        break;
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = handling;
        break;
      }
    }
  }
}
