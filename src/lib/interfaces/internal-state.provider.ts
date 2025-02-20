/**
 * Interface for providing the initial state.
 * This interface defines a method to provide the initial state of a given type.
 */
export interface InitialStateProvider<T> {
  /**
   * Provides the initial state.
   * @returns T - The initial state.
   */
  provideInitialState(): T;
}
