import { CookieStore } from './cookie-store';

describe('CookieStore', () => {
	let store: CookieStore<string>;
	const key = 'testKey';
	const options = {
		maxAge: 3600,
		domain: 'localhost',
		secure: false
	};

	beforeEach(() => {
		store = new CookieStore<string>(key, options);
		document.cookie = ''; // Clear cookies before each test
	});

	it('should set and get a value', () => {
		const testvalue = 'test-value';

		store.setValue(testvalue);
		const savedObject = store.getValue();
		expect(savedObject).toBeDefined();
		expect(savedObject).toBe('test-value');
	});
});