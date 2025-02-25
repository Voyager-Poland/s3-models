import { inject, NgModule, ModuleWithProviders } from '@angular/core';
import { CURRENCY_INITIAL_STATE_PROVIDER_TOKEN, CURRENCY_STATE_COMPARSION_TOKEN, CURRENCY_STATE_INITIALIZER_TOKEN, CURRENCY_STATE_SAVER_TOKEN, CURRENCY_STORE } from '../tokens/tokens';
import { ClientModule } from '../common/client.module';
import { IntialStateService } from './initial-state.service';
import { CookieOptions } from '../interfaces/cookie-options';
import { StateComparisonService, StateComparisonStructure } from './state-comparison.service';
import { CurrencyEventModule } from '../context/currency-event.module';
import { CurrencyEventEmitter } from '../context/currency-event-emitter';
import { CurrencyEventReader } from '../context/currency-event-reader';
import { StateSaverService } from '../services/state-saver.service';
import { ClientInfoService } from '../common/client-info.service';
import { StateInitializerService } from '../services/state-initializer.service';
import { CookieStore } from './cookie-store';
import { SSRStore } from './ssr-store';

@NgModule({
	imports: [ClientModule, CurrencyEventModule.forRoot()],
	providers: []
})
export class CurrencyStoreModule {
	static forRoot(key: string | 'currency', cookieOptions: CookieOptions = {}, intervalValue: number | null = null): ModuleWithProviders<CurrencyStoreModule> {
		const providers = [
			{
				provide: CURRENCY_STORE,
				useFactory: () => {
					const client = inject(ClientInfoService);
					if (client.isBrowser())
						return new CookieStore<string>(key, cookieOptions);

					return new SSRStore<string>();
				},
				deps: [ClientInfoService]
			},
			{
				provide: CURRENCY_INITIAL_STATE_PROVIDER_TOKEN,
				useFactory: () => {
					return new IntialStateService<string>(inject(CURRENCY_STORE));
				},
				deps: [CURRENCY_STORE]
			},
			{
				provide: CURRENCY_STATE_INITIALIZER_TOKEN,
				useFactory: () => {
					return new StateInitializerService<string>(inject(CURRENCY_INITIAL_STATE_PROVIDER_TOKEN), inject(CurrencyEventEmitter));
				},
				deps: [CURRENCY_INITIAL_STATE_PROVIDER_TOKEN, CurrencyEventEmitter]
			},
			{
				provide: CURRENCY_STATE_SAVER_TOKEN,
				useFactory: () => {
					return new StateSaverService<string>(inject(CURRENCY_STORE), inject(CurrencyEventReader));
				},
				deps: [CURRENCY_STORE, CurrencyEventReader]
			},
			{
				provide: CURRENCY_STATE_COMPARSION_TOKEN,
				useFactory: () => {
					if (intervalValue !== null)
						return new StateComparisonService<string>(inject(CURRENCY_INITIAL_STATE_PROVIDER_TOKEN), inject(CurrencyEventEmitter), intervalValue);
					return new StateComparisonStructure<string>();
				},
				deps: [CURRENCY_INITIAL_STATE_PROVIDER_TOKEN, CurrencyEventEmitter]
			}
		];

		return {
			ngModule: CurrencyStoreModule,
			providers: providers
		};
	}
}
