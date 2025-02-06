import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Abstract class EventBus<T>
 * 
 * Provides a mechanism for emitting and subscribing to events of type T.
 * Uses RxJS's BehaviorSubject to manage the event stream.
 * 
 * @template T - The type of events managed by the EventBus.
 */
export abstract class EventBus<T> {
  private eventSubject: BehaviorSubject<T>;
  private _event$: Observable<T>;

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
  emitEvent(event: T): void {
    this.eventSubject.next(event);
  }
}
