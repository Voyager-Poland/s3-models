import { EventReader } from '@interfaces/event-reader';
import { Subscription } from 'rxjs';
import { Store } from '@interfaces/store';

export class StateSaverService<T> {
	private subscription: Subscription | undefined;

	constructor(private store: Store<T>, private reader: EventReader<T>) {
	}

	saveState(value: T): void {
		this.store.setValue(value);
	}

	public start(): void {
		this.subscription = this.reader.event$.subscribe((state: T) => {
			this.saveState(state);
		})
	}


	// Method to unsubscribe from the event stream
	unsubscribe(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	destroy(): void {
		this.unsubscribe();
	}
}
