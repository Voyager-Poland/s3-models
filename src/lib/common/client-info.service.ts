import { isPlatformBrowser } from '@angular/common';

export class ClientInfoService {
	constructor(
		private platformId: Object
	) { }

	isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}

	isSSR(): boolean {
		return !this.isBrowser();
	}

}