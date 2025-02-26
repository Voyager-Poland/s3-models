import { InitialStateProvider } from "../interfaces/internal-state.provider";
import { EventEmitter } from "../interfaces/event-emitter";

export class StateComparisonStructure<T> {
	start(): void {
	}
	stop(): void {
	}
}

export class StateComparisonService<T> extends StateComparisonStructure<T> {
	private intervalId: NodeJS.Timeout | null = null;

	constructor(
		private initialStateProvider: InitialStateProvider<T>,
		private eventEmitter: EventEmitter<T>,
		private interval: number = 1000 // Default interval of 1 second
	) {
		super();
	}

	override start(): void {
		this.intervalId = setInterval(() => this.checkForChanges(), this.interval);
	}

	override stop(): void {
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