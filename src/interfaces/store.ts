/**
 * Interface for a generic store.
 * Provides methods to get and set the value of a given type.
 */
export interface Store<T> {
	/**
	 * Gets the current value from the store.
	 * @returns The current value of type T.
	 */
	getValue(): T;

	/**
	 * Sets a new value in the store.
	 * @param value - The new value to set.
	 */
	setValue(value: T): void;
}

