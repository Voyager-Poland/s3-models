import { ClientInfo } from '@interfaces/client-info';

export class ClientCallbackService {
	constructor(private clientInfo: ClientInfo) { }

	executeIfBrowser(callback: () => void): void {
		if (this.clientInfo.isBrowser()) {
			callback();
		}
	}

	executeIfSSR(callback: () => void): void {
		if (this.clientInfo.isSSR()) {
			callback();
		}
	}
}