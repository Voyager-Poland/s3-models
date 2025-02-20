import { StateComparisonService } from './state-comparison.service';
import { InitialStateProvider } from '../interfaces/internal-state.provider';
import { EventEmitter } from '../interfaces/event-emitter';

class MockInitialStateProvider<T> implements InitialStateProvider<T> {
	constructor(private state: T) { }

	provideInitialState(): T {
		return this.state;
	}

	setState(state: T): void {
		this.state = state;
	}
}

class MockEventEmitter<T> implements EventEmitter<T> {
	private currentValue: T;

	constructor(initialValue: T) {
		this.currentValue = initialValue;
	}

	emitEvent(event: T): void {
		this.currentValue = event;
	}

	get getCurrentValue(): T {
		return this.currentValue;
	}
}

describe('StateComparisonService', () => {
	let initialStateProvider: MockInitialStateProvider<string>;
	let eventEmitter: MockEventEmitter<string>;
	let stateComparisonService: StateComparisonService<string>;

	beforeEach(() => {
		initialStateProvider = new MockInitialStateProvider<string>('initial');
		eventEmitter = new MockEventEmitter<string>('initial');
		stateComparisonService = new StateComparisonService<string>(initialStateProvider, eventEmitter, 100);
	});

	afterEach(() => {
		stateComparisonService.stop();
	});

	it('should emit event when state changes', (done) => {
		stateComparisonService.start();

		setTimeout(() => {
			initialStateProvider.setState('new state');
		}, 50);

		setTimeout(() => {
			expect(eventEmitter.getCurrentValue).toBe('new state');
			done();
		}, 200);
	});

	it('should not emit event when state does not change', (done) => {
		stateComparisonService.start();

		setTimeout(() => {
			expect(eventEmitter.getCurrentValue).toBe('initial');
			done();
		}, 200);
	});

	it('should stop checking for changes when stopped', (done) => {
		stateComparisonService.start();
		stateComparisonService.stop();

		setTimeout(() => {
			initialStateProvider.setState('new state');
		}, 50);

		setTimeout(() => {
			expect(eventEmitter.getCurrentValue).toBe('initial');
			done();
		}, 200);
	});
});