import { EventEmitter } from "src/interfaces/event-emitter";
import { LanguageEventBusService } from './language-bus.service';


export class LanguageEventEmitter implements EventEmitter<string> {
	constructor(private service: LanguageEventBusService) { }

	public emitEvent(event: string): void {
		this.service.emitEvent(event);
	}

	public get getCurrentValue(): string {
		return this.service.getCurrentValue;
	}
}
