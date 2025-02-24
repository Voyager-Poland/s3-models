import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ProfileEventEmitter } from '../context/profile-event-emitter';
import { ProfileEventModule } from '../context/profile-event.module';
import { ProfileTokenModel } from '../models/profile.token.model';
import { PROFILE_STATE_COMPARSION_TOKEN, PROFILE_STATE_INITIALIZER_TOKEN } from '../tokens/tokens';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonService, StateComparisonStructure } from '../stores/state-comparison.service';


@Injectable(
	{
		providedIn: ProfileEventModule,
		useFactory: () => {
			return new LoginService(Inject(PROFILE_STATE_INITIALIZER_TOKEN),
				Inject(PROFILE_STATE_INITIALIZER_TOKEN),
				Inject(ProfileEventEmitter),
				Inject(PROFILE_STATE_COMPARSION_TOKEN)
			);
		},
		deps: [PROFILE_STATE_INITIALIZER_TOKEN, PROFILE_STATE_INITIALIZER_TOKEN, ProfileEventEmitter, PROFILE_STATE_COMPARSION_TOKEN]
	})
export class LoginService implements OnDestroy {
	constructor(
		private stateInitializer: StateInitializerService<ProfileTokenModel>,
		private stateSaver: StateSaverService<ProfileTokenModel>,
		private emitter: ProfileEventEmitter,
		private stateComparer: StateComparisonStructure<ProfileTokenModel>) {
		this.stateInitializer.setState();
		this.stateSaver.start();
		this.stateComparer.start();
	}

	ngOnDestroy(): void {
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
