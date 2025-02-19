import { StateInitializerService } from './state-initializer.service';
import { InitialStateProvider } from '@interfaces/internal-state.provider';
import { EventEmitter } from '@interfaces/event-emitter';
import { jest } from '@jest/globals';

describe('StateInitializerService', () => {
	let service: StateInitializerService<string>;
	let initialStateProvider: InitialStateProvider<string>;
	let eventEmitter: EventEmitter<string>;

	beforeEach(() => {
		initialStateProvider = {
			provideInitialState: jest.fn<() => string>().mockReturnValue('initial-state')
		};

		eventEmitter = {
			emitEvent: jest.fn(),
			get getCurrentValue() {
				return 'initial-state';
			}
		};

		service = new StateInitializerService<string>(initialStateProvider, eventEmitter);
	});

	it('should set the initial state', () => {
		service.setState();
		expect(initialStateProvider.provideInitialState).toHaveBeenCalled();
		expect(eventEmitter.emitEvent).toHaveBeenCalledWith('initial-state');
	});
});