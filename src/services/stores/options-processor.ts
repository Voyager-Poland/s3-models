import { CookieOptions } from '../../interfaces/cookie-options';

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

	get sameSite() {
		return this.options.sameSite ? `SameSite=${this.options.sameSite};` : '';
	}

	get value() {
		return `${this.maxAge} ${this.domain} ${this.secure} ${this.sameSite}`;
	}
}