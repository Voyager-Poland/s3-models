import { EventEmitter } from '../interfaces/event-emitter';
import { CurrencyEventBusService } from './currency-bus.service';


/**
 * Event emitter for currency events.
 */
export class CurrencyEventEmitter implements EventEmitter<string> {
	constructor(private service: CurrencyEventBusService) { }

	public emitEvent(event: string): void {
		this.service.emitEvent(event);
	}

	public get getCurrentValue(): string {
		return this.service.getCurrentValue;
	}

	public complete(): void {
		this.service.complete();
	}
}
