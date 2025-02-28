import { CurrencyEventEmitter } from '../context/currency-event-emitter';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';
import { generateRandomString } from '../utils/string-utils';
import { Inject, Injectable } from '@angular/core';
import { CURRENCY_STATE_COMPARSION_TOKEN, CURRENCY_STATE_INITIALIZER_TOKEN, CURRENCY_STATE_SAVER_TOKEN } from '../tokens/tokens';

@Injectable({
	providedIn: 'root',
	deps: [CURRENCY_STATE_INITIALIZER_TOKEN, CURRENCY_STATE_SAVER_TOKEN, CurrencyEventEmitter, CURRENCY_STATE_COMPARSION_TOKEN]
})
export class CurrencyService {

	/** 
	@obsolete delete it after testing
	*/
	checkIstance: string;

	constructor(
		@Inject(CURRENCY_STATE_INITIALIZER_TOKEN) private stateInitializer: StateInitializerService<string>,
		@Inject(CURRENCY_STATE_SAVER_TOKEN) private stateSaver: StateSaverService<string>,
		private emitter: CurrencyEventEmitter,
		@Inject(CURRENCY_STATE_COMPARSION_TOKEN) private stateComparer: StateComparisonStructure<string>) {
		this.checkIstance = generateRandomString(16);
		this.stateInitializer.setState();
		this.stateSaver.start();
		this.stateComparer.start();
	}

	destroy(): void {
		this.stateComparer.stop();
		this.stateSaver.destroy();
		this.emitter.complete();
	}

	onCurrencyChange(currency: string) {
		this.emitter.emitEvent(currency);
	}


}
