import { randomBytes } from 'crypto';

export abstract class EventBus<T> {
	protected value: string;

	constructor(initialValue: T) {
		this.value = randomBytes(16).toString('hex');
		// ...existing code...
	}

	// ...existing code...
}
