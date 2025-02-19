import { EventEmitter } from 'src/interfaces/event-emitter';
import { CurrencyEventBusService } from './currency-bus.service';



export class CurrencyEventEmitter implements EventEmitter<string> {

	constructor(private service: CurrencyEventBusService) { }

	public emitEvent(event: string): void {
		this.service.emitEvent(event);
	}

	public get getCurrentValue(): string {
		return this.service.getCurrentValue;
	}
}
