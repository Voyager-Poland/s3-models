import { TestBed } from '@angular/core/testing';
import { CurrencyStoreModule } from './currency-store.module';
import { ClientInfoService } from '../common/client-info.service';
import { CookieStore } from './cookie-store';
import { SSRStore } from './ssr-store';
import { CURRENCY_STORE } from '../tokens/tokens';

describe('CurrencyStoreModule', () => {
	let clientInfoServiceMock: jest.Mocked<ClientInfoService>;

	beforeEach(() => {
		const mock = {
			isBrowser: jest.fn()
		};

		TestBed.configureTestingModule({
			imports: [CurrencyStoreModule.forRoot('currency')],
			providers: [
				{ provide: ClientInfoService, useValue: mock }
			]
		});

		clientInfoServiceMock = TestBed.inject(ClientInfoService) as jest.Mocked<ClientInfoService>;
	});

	it('should provide CookieStore when in browser', () => {
		clientInfoServiceMock.isBrowser.mockReturnValue(true);
		const store = TestBed.inject(CURRENCY_STORE);
		expect(store instanceof CookieStore).toBe(true);
	});

	it('should provide SSRStore when not in browser', () => {
		clientInfoServiceMock.isBrowser.mockReturnValue(false);
		const store = TestBed.inject(CURRENCY_STORE);
		expect(store instanceof SSRStore).toBe(true);
	});
});
