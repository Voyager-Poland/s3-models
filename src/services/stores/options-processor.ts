import { CookieOptions } from './cookie-store';

export class OptionsProcessor {
	constructor(private options: CookieOptions) { }

	get maxAge() {
		return this.options.maxAge ? `max-age=${this.options.maxAge};` : '';
	}

	get domain() {
		return this.options.domain ? `domain=${this.options.domain};` : '';
	}

	get secure() {
		return this.options.secure ? 'secure;' : '';
	}

	get value() {
		return `${this.maxAge} ${this.domain} ${this.secure}`;
	}
}