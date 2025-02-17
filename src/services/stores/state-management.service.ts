import { InitialStateProvider } from '../../interfaces/internal-state.provider';
import { StateSaver } from '../../interfaces/state-saver';
import { Store } from '../../interfaces/store';

export class StateManagementService<T> implements InitialStateProvider<T>, StateSaver<T> {
	constructor(private store: Store<T>) { }

	provideInitialState(): T {
		return this.store.getValue();
	}

	saveState(value: T): void {
		this.store.setValue(value);
	}
}