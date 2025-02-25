import { TestBed } from '@angular/core/testing';
import { CurrencyEventModule } from './currency-event.module';
import { CurrencyEventReader } from './currency-event-reader';
import { CurrencyEventEmitter } from './currency-event-emitter';
import { CurrencyEventBusService } from './currency-bus.service';

describe('CurrencyEventModule', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [CurrencyEventModule.forRoot()]
		});
	});

	it('should provide CurrencyEventReader', () => {
		const reader = TestBed.inject(CurrencyEventReader);
		expect(reader).toBeTruthy();
	});

	it('should provide CurrencyEventEmitter', () => {
		const emitter = TestBed.inject(CurrencyEventEmitter);
		expect(emitter).toBeTruthy();
	});

	it('should provide CurrencyEventBusService', () => {
		const service = TestBed.inject(CurrencyEventBusService);
		expect(service).toBeTruthy();
	});
});
