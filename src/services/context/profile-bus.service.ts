import { EventBus } from '../../abstract/event-bus';
import { EventReader } from '../../interfaces/event-reader';
import { EventEmitter } from '../../interfaces/event-emitter';
import { ProfileTokenModel } from '../../models/profile.token.model';

/**
 * Service for managing profile events.
 * 
 * Extends the EventBus class to handle events of type ProfileTokenModel.
 */
export class ProfileEventBusService extends EventBus<ProfileTokenModel>
	implements EventReader<ProfileTokenModel>, EventEmitter<ProfileTokenModel> {
	/**
	 * Creates an instance of ProfileEventBusService.
	 * Initializes the EventBus with an empty ProfileTokenModel.
	 */
	constructor() {
		super(ProfileTokenModel.createEmpty());
	}
}


