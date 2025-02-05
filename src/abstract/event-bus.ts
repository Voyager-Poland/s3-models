import { BehaviorSubject, Observable } from 'rxjs';

export abstract class EventBus<T> {
  private eventSubject: BehaviorSubject<T>;
	public event$: Observable<T>;
	
  protected constructor(initialValue: T) {
    this.eventSubject = new BehaviorSubject<T>(initialValue);
		this.event$ = this.eventSubject.asObservable();
  }

  emitEvent(event: T): void {
    this.eventSubject.next(event);
  }
}
