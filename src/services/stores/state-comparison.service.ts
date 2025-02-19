import { InitialStateProvider } from "src/interfaces/internal-state.provider";
import { EventEmitter } from "src/interfaces/event-emitter";

export class StateComparisonService<T> {
	private intervalId: NodeJS.Timeout | null = null;

	constructor(
		private initialStateProvider: InitialStateProvider<T>,
		private eventEmitter: EventEmitter<T>,
		private interval: number = 1000 // Default interval of 1 second
	) {
	}

	start(): void {
		this.intervalId = setInterval(() => this.checkForChanges(), this.interval);
	}

	stop(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	private checkForChanges(): void {
		const newValue = this.initialStateProvider.provideInitialState();
		if (JSON.stringify(newValue) !== JSON.stringify(this.eventEmitter.getCurrentValue)) {
			this.eventEmitter.emitEvent(newValue);
		}
	}
}