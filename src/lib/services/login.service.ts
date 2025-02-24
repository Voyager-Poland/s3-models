import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ProfileEventEmitter, ProfileEventModule, ProfileTokenModel } from 's3-models';
import { PROFILE_STATE_INITIALIZER_TOKEN } from '../tokens/tokens';
import { StateInitializerService } from './state-initializer.service';



export class LoginService implements OnDestroy {
	constructor(
		 private stateInitializer: StateInitializerService<ProfileTokenModel>, 
        private stateSaver: ProfileStateSaveService, private emitter: ProfileEventEmitter) {
		this.stateInitializer.setState();
		this.stateSaver.start();
	}

	ngOnDestroy(): void {
		this.stateSaver.destroy();
	}

	onLogin(login: ProfileTokenModel) {
		this.emitter.emitEvent(login);
	}

	onLogout() {
		this.emitter.emitEvent(ProfileTokenModel.createEmpty());
	}

}
