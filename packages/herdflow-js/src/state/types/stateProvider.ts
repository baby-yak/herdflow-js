/**
 * a general StateProvider interface. the only constraint is that it will have a client property
 */
export type StateProvider<StateClient> = {
  readonly client: StateClient;
};
