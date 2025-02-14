import { EventReader } from '../interfaces/event-reader';
import { StateSaver } from '../interfaces/state-saver';
import { Subscription } from 'rxjs';

export class StateSaverService<T>  {
  private subscription: Subscription;

  constructor(private store: StateSaver<T>, private reader: EventReader<T>) {
    this.subscription = reader.event$.subscribe((state: T) => {
      store.saveState(state);
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
