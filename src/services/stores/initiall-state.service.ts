import { InitialStateProvider } from '../../interfaces/internal-state.provider';
import { StateSaver } from '../../interfaces/state-saver';
import { Store } from '../../interfaces/store';

export class IntialStateService<T> implements InitialStateProvider<T> {
	constructor(private store: Store<T>) { }

	provideInitialState(): T {
		return this.store.getValue();
	}

}