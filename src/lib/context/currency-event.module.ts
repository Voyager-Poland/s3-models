import { ModuleWithProviders, NgModule } from '@angular/core';
import { CurrencyEventReader } from './currency-event-reader';
import { CurrencyEventBusService } from './currency-bus.service';
import { CurrencyEventEmitter } from './currency-event-emitter';

export function createCurrencyEventReader(service: CurrencyEventBusService): CurrencyEventReader {
	return new CurrencyEventReader(service);
}

export function createCurrencyEventEmitter(service: CurrencyEventBusService): CurrencyEventEmitter {
	return new CurrencyEventEmitter(service);
}

@NgModule({
	providers: []
})
export class CurrencyEventModule {
	static forRoot(): ModuleWithProviders<CurrencyEventModule> {
		return {
			ngModule: CurrencyEventModule,
			providers: [
				{
					provide: CurrencyEventReader,
					useFactory: createCurrencyEventReader,
					deps: [CurrencyEventBusService],
				},
				{
					provide: CurrencyEventEmitter,
					useFactory: createCurrencyEventEmitter,
					deps: [CurrencyEventBusService],
				}
			]
		};
	}
}
