import { ClientInfoService } from "./client-info.service";

export class ClientCallbackService {
	constructor(private clientInfo: ClientInfoService) { }

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