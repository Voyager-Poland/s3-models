import { EventBus } from '../abstract/event-bus';



export class CurrencyEventBusService extends EventBus<string> {
	constructor() {
		super('PLN'); // Call the constructor of the abstract class with 'PLN' as the initial value
	}
}
