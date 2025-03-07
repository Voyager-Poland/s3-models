import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter } from '../interfaces/event-emitter';
import { EventReader } from '../interfaces/event-reader';
import { generateRandomString } from '../utils/string-utils';

/**
 * Abstract class EventBus<T>
 * 
 * Provides a mechanism for emitting and subscribing to events of type T.
 * Uses RxJS's BehaviorSubject to manage the event stream.
 * 
 * @template T - The type of events managed by the EventBus.
 */
export abstract class EventBus<T> implements EventEmitter<T>, EventReader<T> {
	private eventSubject: BehaviorSubject<T>;
	private _event$: Observable<T>;

	/**
	 @obsolete - delete this after testing
	 */
	randomBytes: string;
	/**
	 * Constructor
	 * 
	 * Initializes the BehaviorSubject with an initial value and sets up the observable event stream.
	 * 
	 * @param initialValue - The initial value for the BehaviorSubject.
	 */
	protected constructor(initialValue: T) {
		this.eventSubject = new BehaviorSubject<T>(initialValue);
		this._event$ = this.eventSubject.asObservable();
		this.randomBytes = generateRandomString(16);
	}

	/**
	 * Gets the observable event stream.
	 * 
	 * @returns Observable<T> - The observable event stream.
	 */
	public get event$(): Observable<T> {

		return this._event$;
	}

	/**
	 * Emits a new event.
	 * 
	 * @param event - The event to emit.
	 */
	public emitEvent(event: T): void {
		this.eventSubject.next(event);
	}

	/**
	 * Gets the current value of the event stream.
	 * 
	 * @returns T - The current value of the event stream.
	 */
	public get getCurrentValue(): T {
		return this.eventSubject.getValue();
	}

	/**
	 * Completes the event stream.
	 */
	public complete(): void {
		this.eventSubject.complete();
	}
}
