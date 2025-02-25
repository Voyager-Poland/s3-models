import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter } from '../interfaces/event-emitter';
import { EventReader } from '../interfaces/event-reader';

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
		this.randomBytes = this.generateRandomString(16);
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
		console.log('EventBus: Emitting event', event);
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

	private generateRandomString(length: number): string {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}
