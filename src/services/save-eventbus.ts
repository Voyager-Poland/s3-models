import { EventReader } from '../interfaces/event-reader';
import { ProtectState } from '../interfaces/protect-state';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class SaveEventBus<T> implements OnDestroy {
  private subscription: Subscription;

  constructor(private store: ProtectState<T>, private reader: EventReader<T>) {
    this.subscription = reader.event$.subscribe((state: T) => {
      store.save(state);
    })
  }

  // Method to unsubscribe from the event stream
  unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Angular lifecycle hook for cleanup
  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
