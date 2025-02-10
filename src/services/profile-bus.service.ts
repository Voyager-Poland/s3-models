import { EventBus } from '../abstract/event-bus';
import { EventReader } from '../interfaces/event-reader';
import { EventEmitter } from '../interfaces/event-emitter';
import { ProfileTokenModel } from '../models/profile.token.model';
import { Observable } from 'rxjs';

/**
 * Service for managing profile events.
 * 
 * Extends the EventBus class to handle events of type ProfileTokenModel.
 */
export class ProfileEventBusService extends EventBus<ProfileTokenModel>
	implements EventReader<ProfileTokenModel>,	EventEmitter<ProfileTokenModel>  {
  /**
   * Creates an instance of ProfileEventBusService.
   * Initializes the EventBus with an empty ProfileTokenModel.
   */
  constructor() {
    super(ProfileTokenModel.createEmpty());
  }
}

export class ProfilEventEmiter implements EventEmitter<ProfileTokenModel> {
	constructor( private service: ProfileEventBusService) {
	}

	public emitEvent(event: ProfileTokenModel): void {
		this.service.emitEvent(event);
	}
}

export class ProfilEventReader implements EventReader<ProfileTokenModel> {
	constructor( private service: ProfileEventBusService) {
	}

	public get event$(): Observable<ProfileTokenModel> {
		return this.service.event$;
	}
}
