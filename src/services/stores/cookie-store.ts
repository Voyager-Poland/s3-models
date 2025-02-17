import { Store } from '../../interfaces/store';
import { OptionsProcessor } from './options-processor';


export interface CookieOptions {
	maxAge?: number;
	domain?: string;
	secure?: boolean;
}

export class CookieStore<T> implements Store<T> {
	private optionsProcessor: OptionsProcessor;
	constructor(private key: string, options: CookieOptions = {}) {
		this.optionsProcessor = new OptionsProcessor(options);
	}

	getValue(): T {
		const cookieValue = document.cookie
			.split('; ')
			.find(row => row.startsWith(`${this.key}=`))
			?.split('=')[1];

		if (cookieValue) {
			return this.deserialize(decodeURIComponent(cookieValue));
		}

		return null as unknown as T;
	}

	setValue(value: T): void {
		const cookieValue = encodeURIComponent(this.serialize(value));
		let cookieString = `${this.key}=${cookieValue}; path=/;` + this.optionsProcessor.value;
		document.cookie = cookieString;
	}

	protected serialize(value: T): string {
		return JSON.stringify(value);
	}

	protected deserialize(value: string): T {
		return JSON.parse(value);
	}

}