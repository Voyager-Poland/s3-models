/**
 * Interface for saving state.
 * This interface defines a method to save the state of a given type.
 */
export interface StateSaver<T> {
  /**
   * Saves the state.
   * @param value - The state value to save.
   */
  saveState(value: T): void;
}
