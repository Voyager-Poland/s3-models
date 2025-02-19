import { InitialStateProvider } from "src/interfaces/internal-state.provider";
import { Store } from 'src/interfaces/store';

export class IntialStateService<T> implements InitialStateProvider<T> {
	constructor(private store: Store<T>) { }

	provideInitialState(): T {
		return this.store.getValue();
	}

}