/**
 * a general StateProvider interface. the only constraint is that it will have a client property
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type StateProvider<StateClient, S = undefined> = {
  readonly client: StateClient;
};
