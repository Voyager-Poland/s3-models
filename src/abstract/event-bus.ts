export abstract class EventBus<T> {
	protected value: string;

	constructor(initialValue: T) {
		this.value = this.generateRandomString(16);
		// ...existing code...
	}

	/**
	 * Generates a random string of the specified length.
	 * @param length The length of the random string.
	 * @returns A random string.
	 */
	private generateRandomString(length: number): string {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	// ...existing code...
}
