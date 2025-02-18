import { EventEmitter } from '../interfaces/event-emitter';
import { InitialStateProvider } from '../interfaces/internal-state.provider';

export class StateInitializerService<T> {
	constructor(private initialState: InitialStateProvider<T>, private emitter: EventEmitter<T>) { }

	public setState(): void {
		var provideInitialState = this.initialState.provideInitialState();
		if (provideInitialState) {
			this.emitter.emitEvent(provideInitialState);
		}
	}
}