import { EventBus } from '../abstract/event-bus';



export class LanguageEventBusService extends EventBus<string> {
	constructor() {
		super('pl'); // Call the constructor of the abstract class with 'PL' as the initial value
	}
}


