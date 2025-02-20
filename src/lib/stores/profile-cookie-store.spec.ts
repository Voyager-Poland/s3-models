import { ProfileTokenCookieStore } from './profile-cookie-store';
import { ProfileTokenModel } from '../models/profile.token.model';

describe('ProfileTokenCookieStore', () => {
	let store: ProfileTokenCookieStore;
	const key = 'profileToken';
	const options = {
		maxAge: 3600,
		domain: 'localhost',
		secure: false
	};

	beforeEach(() => {
		store = new ProfileTokenCookieStore(key, options);
		document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Clear cookies before each test
	});

	it('should set and get a ProfileTokenModel value', () => {
		const testObject = new ProfileTokenModel({
			token: 'test-token',
			initials: 'TT',
			profilePictureUri: 'http://example.com/pic.jpg'
		});

		store.setValue(testObject);

		const savedObject = store.getValue();

		expect(savedObject).toBeDefined();
		expect(savedObject.token).toBe('test-token');
		expect(savedObject.initials).toBe('TT');
		expect(savedObject.profilePictureUri).toBe('http://example.com/pic.jpg');
		expect(savedObject.isLogged).toBe(true);
	});

	it('should return emptyToken if the cookie is empty', () => {

		const value = store.getValue();
		expect(value).toBeDefined();
		expect(value.token).toBe('');
		expect(value.initials).toBe('');
		expect(value.profilePictureUri).toBe('');
		expect(value.isLogged).toBe(false);
	});
});