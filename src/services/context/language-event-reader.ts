import { Observable } from 'rxjs';
import { EventReader } from '@interfaces/event-reader';
import { LanguageEventBusService } from './language-bus.service';


export class LanguageEventReader implements EventReader<string> {
	constructor(private service: LanguageEventBusService) { }

	public get event$(): Observable<string> {
		return this.service.event$;
	}
}
