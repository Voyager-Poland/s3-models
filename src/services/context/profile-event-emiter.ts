import { EventEmitter } from '../../interfaces/event-emitter';
import { ProfileTokenModel } from '../../models/profile.token.model';
import { ProfileEventBusService } from './profile-bus.service';


export class ProfileEventEmitter implements EventEmitter<ProfileTokenModel> {
	constructor(private service: ProfileEventBusService) {
	}

	public emitEvent(event: ProfileTokenModel): void {
		this.service.emitEvent(event);
	}

	public get getCurrentValue(): ProfileTokenModel {
		return this.service.getCurrentValue;
	}

}
