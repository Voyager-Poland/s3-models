import { NgModule, inject } from '@angular/core';
import { ProfileEventEmitter } from '../context/profile-event-emitter';
import { ProfileEventModule } from '../context/profile-event.module';
import { ProfileStoreModule } from '../stores/profile-store.module';
import { PROFILE_STATE_INITIALIZER_TOKEN, PROFILE_STATE_COMPARSION_TOKEN, PROFILE_STATE_SAVER_TOKEN } from '../tokens/tokens';
import { LoginService } from './login.service';



@NgModule({
    imports: [ProfileEventModule, ProfileStoreModule],
    providers: [
        {
            provide: LoginService,
            useFactory: () => {
                return new LoginService(
                    inject(PROFILE_STATE_INITIALIZER_TOKEN),
                    inject(PROFILE_STATE_SAVER_TOKEN),
                    inject(ProfileEventEmitter),
                    inject(PROFILE_STATE_COMPARSION_TOKEN)
                );
            },
            deps: [PROFILE_STATE_INITIALIZER_TOKEN, PROFILE_STATE_SAVER_TOKEN, PROFILE_STATE_INITIALIZER_TOKEN, ProfileEventEmitter, PROFILE_STATE_COMPARSION_TOKEN]
        }
    ]
})
export class LoginServiceModule {
}
