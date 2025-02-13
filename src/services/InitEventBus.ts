import { EventEmitter } from '../interfaces/event-emitter';
import { ReadState } from '../interfaces/read-state';


export class InitEventBus<T> {
	constructor(private initialstate: ReadState<T>, private emiter: EventEmitter<T>) {
	}

	public setState(): void {
		this.emiter.emitEvent(this.initialstate.getInitialState());
	}
}
