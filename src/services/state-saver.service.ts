import { EventReader } from '../interfaces/event-reader';
import { StateSaver } from '../interfaces/state-saver';
import { Subscription } from 'rxjs';

export class StateSaverService<T> {
	private subscription: Subscription | undefined;

	constructor(private store: StateSaver<T>, private reader: EventReader<T>) {
	}
	
	saveState(value: T): void {
		this.store.saveState(value);
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
