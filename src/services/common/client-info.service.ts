import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClientInfo } from '../../interfaces/client-info';


export class ClientInfoService implements ClientInfo {
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