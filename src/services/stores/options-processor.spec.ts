import { OptionsProcessor } from './options-processor';
import { CookieOptions } from './cookie-store';

describe('OptionsProcessor', () => {
	it('should return correct maxAge string', () => {
		const options: CookieOptions = { maxAge: 3600 };
		const processor = new OptionsProcessor(options);
		expect(processor.maxAge).toBe('max-age=3600;');
	});

	it('should return empty maxAge string if not set', () => {
		const options: CookieOptions = {};
		const processor = new OptionsProcessor(options);
		expect(processor.maxAge).toBe('');
	});

	it('should return correct domain string', () => {
		const options: CookieOptions = { domain: 'example.com' };
		const processor = new OptionsProcessor(options);
		expect(processor.domain).toBe('domain=example.com;');
	});

	it('should return empty domain string if not set', () => {
		const options: CookieOptions = {};
		const processor = new OptionsProcessor(options);
		expect(processor.domain).toBe('');
	});

	it('should return correct secure string', () => {
		const options: CookieOptions = { secure: true };
		const processor = new OptionsProcessor(options);
		expect(processor.secure).toBe('secure;');
	});

	it('should return empty secure string if not set', () => {
		const options: CookieOptions = {};
		const processor = new OptionsProcessor(options);
		expect(processor.secure).toBe('');
	});

	it('should return correct combined value string', () => {
		const options: CookieOptions = { maxAge: 3600, domain: 'example.com', secure: true };
		const processor = new OptionsProcessor(options);
		expect(processor.value).toBe('max-age=3600; domain=example.com; secure;');
	});

	it('should return correct combined value string with some options missing', () => {
		const options: CookieOptions = { maxAge: 3600, secure: true };
		const processor = new OptionsProcessor(options);
		expect(processor.value).toBe('max-age=3600;  secure;');
	});
});