import { CurrencyService } from './currency.service';
import { CurrencyEventEmitter } from '../context/currency-event-emitter';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';
import { CurrencyEventBusService } from '../context/currency-bus.service';
import { jest } from '@jest/globals';
import { IntialStateService } from '../stores/initial-state.service';
import { SSRStore } from '../stores/ssr-store';

describe('CurrencyService', () => {
	let currencyService: CurrencyService;
	let stateInitializer: StateInitializerService<string>;
	let stateSaver: StateSaverService<string>;
	let emitter: CurrencyEventEmitter;
	let stateComparer: StateComparisonStructure<string>;
	let currncyEvent: CurrencyEventBusService;
	let store: SSRStore<string>;
	beforeEach(() => {
		currncyEvent = new CurrencyEventBusService();
		store = new SSRStore<string>();
		stateInitializer = new StateInitializerService<string>(new IntialStateService<string>(store), currncyEvent);
		stateSaver = new StateSaverService<string>(store, currncyEvent);
		emitter = new CurrencyEventEmitter(currncyEvent)
		stateComparer = new StateComparisonStructure<string>();

		jest.spyOn(stateInitializer, 'setState');
		jest.spyOn(stateSaver, 'start');
		jest.spyOn(stateSaver, 'destroy');
		jest.spyOn(stateComparer, 'start');
		jest.spyOn(stateComparer, 'stop');
		jest.spyOn(emitter, 'emitEvent');
		jest.spyOn(emitter, 'complete');

		currencyService = new CurrencyService(stateInitializer, stateSaver, emitter, stateComparer);
	});

	it('should initialize services on creation', () => {
		expect(stateInitializer.setState).toHaveBeenCalled();
		expect(stateSaver.start).toHaveBeenCalled();
		expect(stateComparer.start).toHaveBeenCalled();
	});

	it('should stop services on destroy', () => {
		currencyService.destroy();
		expect(stateComparer.stop).toHaveBeenCalled();
		expect(stateSaver.destroy).toHaveBeenCalled();
		expect(emitter.complete).toHaveBeenCalled();
	});

	it('should emit event on currency change', () => {
		const currency = 'USD';
		currencyService.onCurrencyChange(currency);
		expect(emitter.emitEvent).toHaveBeenCalledWith(currency);
	});
});
