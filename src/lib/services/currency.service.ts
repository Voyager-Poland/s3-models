import { CurrencyEventEmitter } from '../context/currency-event-emitter';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';

export class CurrencyService {
	constructor(
		private stateInitializer: StateInitializerService<string>,
		private stateSaver: StateSaverService<string>,
		private emitter: CurrencyEventEmitter,
		private stateComparer: StateComparisonStructure<string>) {
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
