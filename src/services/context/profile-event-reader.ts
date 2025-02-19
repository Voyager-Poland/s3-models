import { Observable } from 'rxjs';
import { ProfileTokenModel } from '../../models/profile.token.model';
import { EventReader } from '@interfaces/event-reader';
import { ProfileEventBusService } from './profile-bus.service';


export class ProfileEventReader implements EventReader<ProfileTokenModel> {
	constructor(private service: ProfileEventBusService) {
	}

	public get event$(): Observable<ProfileTokenModel> {
		return this.service.event$;
	}
}
