import { TestBed } from '@angular/core/testing';
import { ProfileStoreModule } from './profile-store.module';
import { CLIENT_INFO_TOKEN, PROFILE_STORE } from '../tokens/tokens';
import { ProfileTokenCookieStore } from '../stores/profile-cookie-store';
import { ProfileSSRStore } from '../stores/profile-ssr-store';
import { ClientInfo } from '../interfaces/client-info';

describe('ProfileStoreModule', () => {
    let clientInfoMock: jest.Mocked<ClientInfo>;

    beforeEach(() => {
        clientInfoMock = {
            isBrowser: jest.fn().mockReturnValue(true),
            isSSR: jest.fn().mockReturnValue(false)
        };

        TestBed.configureTestingModule({
            imports: [ProfileStoreModule.forRoot('profile', { domain: "zaaa.pl" })],
            providers: [
                { provide: CLIENT_INFO_TOKEN, useValue: clientInfoMock }
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
                { provide: CLIENT_INFO_TOKEN, useValue: clientInfoMock }
            ]
        });
        const profileStore = TestBed.inject(PROFILE_STORE);
        expect(profileStore).toBeInstanceOf(ProfileSSRStore);
    });
});
