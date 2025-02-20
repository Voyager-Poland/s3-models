/**
 * Interface for event emitters.
 * Provides methods to emit events and get the current value of the event stream.
 */
export interface EventEmitter<T> {
	/**
	 * Emits a new event.
	 * @param event - The event to emit.
	 */
	emitEvent(event: T): void;

	/**
	 * Gets the current value of the event stream.
	 * @returns The current value of the event stream.
	 */
	get getCurrentValue(): T;
}


