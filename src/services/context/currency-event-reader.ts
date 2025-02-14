import { Observable } from 'rxjs';
import { EventReader } from '../../interfaces/event-reader';
import { CurrencyEventBusService } from './currency-bus.service';



export class CurrencyEventReader implements EventReader<string> {
	constructor(private service: CurrencyEventBusService) { }

	public get event$(): Observable<string> {
		return this.service.event$;
	}
}
