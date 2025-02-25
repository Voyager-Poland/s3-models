import { TestBed } from '@angular/core/testing';
import { ProfileStoreModule } from './profile-store.module';
import { PROFILE_STORE, PROFILE_INITIAL_STATE_PROVIDER_TOKEN, PROFILE_STATE_COMPARSION_TOKEN } from '../tokens/tokens';
import { ProfileTokenCookieStore } from './profile-cookie-store';
import { ProfileSSRStore } from './profile-ssr-store';
import { IntialStateService } from './initial-state.service';
import { StateComparisonService, StateComparisonStructure } from './state-comparison.service';
import { ClientInfoService } from '../common/client-info.service';

jest.mock('../common/client-info.service');

describe('ProfileStoreModule', () => {
	let clientInfoMock: jest.Mocked<ClientInfoService>;

	beforeEach(() => {
		clientInfoMock = new ClientInfoService("?") as jest.Mocked<ClientInfoService>;
		clientInfoMock.isBrowser.mockReturnValue(true);
		clientInfoMock.isSSR.mockReturnValue(false);

		TestBed.configureTestingModule({
			imports: [ProfileStoreModule.forRoot('profile', { domain: "zaaa.pl" })],
			providers: [
				{ provide: ClientInfoService, useValue: clientInfoMock }
			]
		});
	});

	it('should provide ProfileTokenCookieStore when in browser', () => {
		const profileStore = TestBed.inject(PROFILE_STORE);
		expect(profileStore).toBeInstanceOf(ProfileTokenCookieStore);
	});

	it('should provide ProfileSSRStore when not in browser', () => {
		clientInfoMock.isBrowser.mockReturnValue(false);
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			imports: [ProfileStoreModule.forRoot('profile', { domain: "zaaa.pl" })],
			providers: [
				{ provide: ClientInfoService, useValue: clientInfoMock }
			]
		});
		const profileStore = TestBed.inject(PROFILE_STORE);
		expect(profileStore).toBeInstanceOf(ProfileSSRStore);
	});

	it('should provide IntialStateService for PROFILE_INITIAL_STATE_PROVIDER_TOKEN', () => {
		const initialStateService = TestBed.inject(PROFILE_INITIAL_STATE_PROVIDER_TOKEN);
		expect(initialStateService).toBeInstanceOf(IntialStateService);
	});

	it('should provide StateComparisonService for PROFILE_STATE_COMPARSION_TOKEN when intervalValue is provided', () => {
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			imports: [ProfileStoreModule.forRoot('profile', { domain: "zaaa.pl" }, 1000)],
			providers: [
				{ provide: ClientInfoService, useValue: clientInfoMock }
			]
		});
		const stateComparisonService = TestBed.inject(PROFILE_STATE_COMPARSION_TOKEN);
		expect(stateComparisonService).toBeInstanceOf(StateComparisonService);
	});

	it('should provide StateComparisonStructure for PROFILE_STATE_COMPARSION_TOKEN when intervalValue is null', () => {
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			imports: [ProfileStoreModule.forRoot('profile', { domain: "zaaa.pl" }, null)],
			providers: [
				{ provide: ClientInfoService, useValue: clientInfoMock }
			]
		});
		const stateComparisonStructure = TestBed.inject(PROFILE_STATE_COMPARSION_TOKEN);
		expect(stateComparisonStructure).toBeInstanceOf(StateComparisonStructure);
	});
});
