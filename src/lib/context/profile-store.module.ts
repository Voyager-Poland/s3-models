import { inject, Inject, NgModule, ModuleWithProviders } from '@angular/core';
import { ProfileTokenCookieStore } from '../stores/profile-cookie-store';
import { ProfileSSRStore } from '../stores/profile-ssr-store';
import { CLIENT_INFO_TOKEN, PROFILE_INITIAL_STATE_PROVIDER_TOKEN, PROFILE_STORE } from '../tokens/tokens';
import { ClientModule } from '../common/client.module';
import { IntialStateService } from '../stores/initial-state.service';
import { ProfileTokenModel } from '../models/profile.token.model';
import { CookieOptions } from '../interfaces/cookie-options';

@NgModule({
    imports: [ClientModule],
    providers: []
})
export class ProfileStoreModule {
    static forRoot(key: string, cookieOptions: CookieOptions = {}): ModuleWithProviders<ProfileStoreModule> {
        return {
            ngModule: ProfileStoreModule,
            providers: [
                {
                    provide: PROFILE_STORE,
                    useFactory: () => {
                        const client = inject(CLIENT_INFO_TOKEN);
                        if (client.isBrowser())
                            return new ProfileTokenCookieStore(key, cookieOptions);

                        return new ProfileSSRStore();
                    },
                    deps: [CLIENT_INFO_TOKEN]
                },
                {
                    provide: PROFILE_INITIAL_STATE_PROVIDER_TOKEN,
                    useFactory: () => {
                        return new IntialStateService<ProfileTokenModel>(inject(PROFILE_STORE));
                    },
                    deps: [PROFILE_STORE]
                }
            ]
        };
    }
}
