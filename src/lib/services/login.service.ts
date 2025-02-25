import { ProfileEventEmitter } from '../context/profile-event-emitter';
import { ProfileTokenModel } from '../models/profile.token.model';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';
import { generateRandomString } from '../utils/string-utils';
export class LoginService {

	/** 
	@obsolete delete it after testing
	*/
	checkIstance: string;

	constructor(
		private stateInitializer: StateInitializerService<ProfileTokenModel>,
		private stateSaver: StateSaverService<ProfileTokenModel>,
		private emitter: ProfileEventEmitter,
		private stateComparer: StateComparisonStructure<ProfileTokenModel>) {
		this.checkIstance = generateRandomString(16);;
		this.stateInitializer.setState();
		this.stateSaver.start();
		this.stateComparer.start();

	}

	destroy(): void {
		this.stateComparer.stop();
		this.stateSaver.destroy();
	}

	onLogin(login: ProfileTokenModel) {
		this.emitter.emitEvent(login);
	}

	onLogout() {
		this.emitter.emitEvent(ProfileTokenModel.createEmpty());
	}
}
