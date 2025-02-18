import { ProfileTokenModel } from "../../models/profile.token.model";
import { ClientCallbackService } from "../client-callback.service";
import { StateInitializerService } from "../state-initializer.service";
import { StateSaverService } from "../state-saver.service";
import { StateComparisonService } from "../stores/state-comparison.service";

export class ProfileService {

	constructor(
		private profileStateInitializer: StateInitializerService<ProfileTokenModel>,
		private stateSaver: StateSaverService<ProfileTokenModel>,
		private clientCallbackService: ClientCallbackService,
		private stateComparer: StateComparisonService<ProfileTokenModel>
	) {
		this.profileStateInitializer.setState();
		this.stateSaver.start();

		this.clientCallbackService.executeIfBrowser(() => {
			this.stateComparer.start();
		});
	}

	destroy() {
		this.clientCallbackService.executeIfBrowser(() => {
			this.stateComparer.stop();
		});
		this.stateSaver.destroy();
	}

}
