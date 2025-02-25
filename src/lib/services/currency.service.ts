import { CurrencyEventEmitter } from '../context/currency-event-emitter';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';
import { generateRandomString } from '../utils/string-utils';

export class CurrencyService {

	/** 
	@obsolete delete it after testing
	*/
	checkIstance: string;

	constructor(
		private stateInitializer: StateInitializerService<string>,
		private stateSaver: StateSaverService<string>,
		private emitter: CurrencyEventEmitter,
		private stateComparer: StateComparisonStructure<string>) {
		this.checkIstance = generateRandomString(16);
		this.stateInitializer.setState();
		this.stateSaver.start();
		this.stateComparer.start();
	}

	destroy(): void {
		this.stateComparer.stop();
		this.stateSaver.destroy();
	}

	onCurrencyChange(currency: string) {
		this.emitter.emitEvent(currency);
	}
}
