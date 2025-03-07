import { inject, NgModule, ModuleWithProviders } from '@angular/core';
import { ProfileTokenCookieStore } from './profile-cookie-store';
import { ProfileSSRStore } from './profile-ssr-store';
import { PROFILE_INITIAL_STATE_PROVIDER_TOKEN, PROFILE_STATE_COMPARSION_TOKEN, PROFILE_STATE_INITIALIZER_TOKEN, PROFILE_STATE_SAVER_TOKEN, PROFILE_STORE } from '../tokens/tokens';
import { ClientModule } from '../common/client.module';
import { IntialStateService } from './initial-state.service';
import { ProfileTokenModel } from '../models/profile.token.model';
import { CookieOptions } from '../interfaces/cookie-options';
import { StateComparisonService, StateComparisonStructure } from './state-comparison.service';
import { ProfileEventModule } from '../context/profile-event.module';
import { ProfileEventEmitter } from '../context/profile-event-emitter';
import { ProfileEventReader } from '../context/profile-event-reader';
import { StateSaverService } from '../services/state-saver.service';
import { ClientInfoService } from '../common/client-info.service';
import { StateInitializerService } from '../services/state-initializer.service';

@NgModule({
	imports: [ClientModule, ProfileEventModule.forRoot()],
	providers: []
})
export class ProfileStoreModule {
	static forRoot(key: string | 'profile', cookieOptions: CookieOptions = {}, intervalValue: number | null = null): ModuleWithProviders<ProfileStoreModule> {
		const providers = [
			{
				provide: PROFILE_STORE,
				useFactory: () => {
					const client = inject(ClientInfoService);
					if (client.isBrowser())
						return new ProfileTokenCookieStore(key, cookieOptions);

					return new ProfileSSRStore();
				},
				deps: [ClientInfoService]
			},
			{
				provide: PROFILE_INITIAL_STATE_PROVIDER_TOKEN,
				useFactory: () => {
					return new IntialStateService<ProfileTokenModel>(inject(PROFILE_STORE));
				},
				deps: [PROFILE_STORE]
			},
			{
				provide: PROFILE_STATE_INITIALIZER_TOKEN,
				useFactory: () => {
					return new StateInitializerService<ProfileTokenModel>(inject(PROFILE_INITIAL_STATE_PROVIDER_TOKEN), inject(ProfileEventEmitter));
				}
				, deps: [PROFILE_INITIAL_STATE_PROVIDER_TOKEN, ProfileEventEmitter]
			},
			{
				provide: PROFILE_STATE_SAVER_TOKEN,
				useFactory: () => {
					return new StateSaverService<ProfileTokenModel>(inject(PROFILE_STORE), inject(ProfileEventReader));
				},
				deps: [PROFILE_STORE, ProfileEventReader]
			},
			{
				provide: PROFILE_STATE_COMPARSION_TOKEN,
				useFactory: () => {
					if (intervalValue !== null)
						return new StateComparisonService<ProfileTokenModel>(inject(PROFILE_INITIAL_STATE_PROVIDER_TOKEN), inject(ProfileEventEmitter), intervalValue);
					return new StateComparisonStructure<ProfileTokenModel>();
				},
				deps: [PROFILE_INITIAL_STATE_PROVIDER_TOKEN, ProfileEventEmitter]
			}
		];

		return {
			ngModule: ProfileStoreModule,
			providers: providers
		};
	}
}
