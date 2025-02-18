import { InitialStateProvider } from '../../interfaces/internal-state.provider';
import { Store } from '../../interfaces/store';

export class IntialStateService<T> implements InitialStateProvider<T> {
	constructor(private store: Store<T>) { }

	provideInitialState(): T {
		return this.store.getValue();
	}

}