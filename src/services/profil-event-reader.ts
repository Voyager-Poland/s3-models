import { Observable } from 'rxjs';
import { EventReader } from '../interfaces/event-reader';
import { ProfileTokenModel } from '../models/profile.token.model';
import { ProfileEventBusService } from './profile-bus.service';


export class ProfilEventReader implements EventReader<ProfileTokenModel> {
	constructor(private service: ProfileEventBusService) {
	}

	public get event$(): Observable<ProfileTokenModel> {
		return this.service.event$;
	}
}
