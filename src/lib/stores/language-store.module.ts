import { inject, NgModule, ModuleWithProviders } from '@angular/core';
import { LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN, LANGUAGE_STATE_COMPARSION_TOKEN, LANGUAGE_STATE_INITIALIZER_TOKEN, LANGUAGE_STATE_SAVER_TOKEN, LANGUAGE_STORE } from '../tokens/tokens';
import { ClientModule } from '../common/client.module';
import { IntialStateService } from './initial-state.service';
import { CookieOptions } from '../interfaces/cookie-options';
import { StateComparisonService, StateComparisonStructure } from './state-comparison.service';
import { LanguageEventModule } from '../context/language-event.module';
import { LanguageEventEmitter } from '../context/language-event-emitter';
import { LanguageEventReader } from '../context/language-event-reader';
import { StateSaverService } from '../services/state-saver.service';
import { ClientInfoService } from '../common/client-info.service';
import { StateInitializerService } from '../services/state-initializer.service';
import { CookieStore } from './cookie-store';
import { SSRStore } from './ssr-store';

@NgModule({
    imports: [ClientModule, LanguageEventModule.forRoot()],
    providers: []
})
export class LanguageStoreModule {
    static forRoot(key: string | 'language', cookieOptions: CookieOptions = {}, intervalValue: number | null = null): ModuleWithProviders<LanguageStoreModule> {
        const providers = [
            {
                provide: LANGUAGE_STORE,
                useFactory: () => {
                    const client = inject(ClientInfoService);
                    if (client.isBrowser())
                        return new CookieStore<string>(key, cookieOptions);

                    return new SSRStore<string>();
                },
                deps: [ClientInfoService]
            },
            {
                provide: LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN,
                useFactory: () => {
                    return new IntialStateService<string>(inject(LANGUAGE_STORE));
                },
                deps: [LANGUAGE_STORE]
            },
            {
                provide: LANGUAGE_STATE_INITIALIZER_TOKEN,
                useFactory: () => {
                    return new StateInitializerService<string>(inject(LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN), inject(LanguageEventEmitter));
                },
                deps: [LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN, LanguageEventEmitter]
            },
            {
                provide: LANGUAGE_STATE_SAVER_TOKEN,
                useFactory: () => {
                    return new StateSaverService<string>(inject(LANGUAGE_STORE), inject(LanguageEventReader));
                },
                deps: [LANGUAGE_STORE, LanguageEventReader]
            },
            {
                provide: LANGUAGE_STATE_COMPARSION_TOKEN,
                useFactory: () => {
                    if (intervalValue !== null)
                        return new StateComparisonService<string>(inject(LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN), inject(LanguageEventEmitter), intervalValue);
                    return new StateComparisonStructure<string>();
                },
                deps: [LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN, LanguageEventEmitter]
            }
        ];

        return {
            ngModule: LanguageStoreModule,
            providers: providers
        };
    }
}
