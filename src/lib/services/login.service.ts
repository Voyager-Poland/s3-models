import { ProfileEventEmitter } from '../context/profile-event-emitter';
import { ProfileTokenModel } from '../models/profile.token.model';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';
import { generateRandomString } from '../utils/string-utils';
import { Inject, Injectable } from '@angular/core';
import { PROFILE_STATE_COMPARSION_TOKEN, PROFILE_STATE_INITIALIZER_TOKEN, PROFILE_STATE_SAVER_TOKEN } from '../tokens/tokens';

@Injectable({
	providedIn: 'root',
	deps: [PROFILE_STATE_INITIALIZER_TOKEN, PROFILE_STATE_SAVER_TOKEN, ProfileEventEmitter, PROFILE_STATE_COMPARSION_TOKEN]
})
export class LoginService {

	/** 
	@obsolete delete it after testing
	*/
	checkIstance: string;

	constructor(
		@Inject(PROFILE_STATE_INITIALIZER_TOKEN) private stateInitializer: StateInitializerService<ProfileTokenModel>,
		@Inject(PROFILE_STATE_SAVER_TOKEN) private stateSaver: StateSaverService<ProfileTokenModel>,
		private emitter: ProfileEventEmitter,
		@Inject(PROFILE_STATE_COMPARSION_TOKEN) private stateComparer: StateComparisonStructure<ProfileTokenModel>) {
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
