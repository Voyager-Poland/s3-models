import { ClientCallbackService } from './client-callback.service';
import { ClientInfo } from '../interfaces/client-info';
import { jest } from '@jest/globals';

class MockClientInfo implements ClientInfo {
	constructor(private isBrowserValue: boolean, private serviceVersion: string) { }

	isBrowser(): boolean {
		return this.isBrowserValue;
	}

	isSSR(): boolean {
		return !this.isBrowserValue;
	}

	getServiceVersion(): string {
		return this.serviceVersion;
	}
}

describe('ClientCallbackService', () => {
	let clientCallbackService: ClientCallbackService;
	let mockClientInfo: MockClientInfo;

	beforeEach(() => {
		mockClientInfo = new MockClientInfo(true, '1.0.0');
		clientCallbackService = new ClientCallbackService(mockClientInfo);
	});

	it('should execute callback if running in the browser', () => {
		const callback = jest.fn();
		clientCallbackService.executeIfBrowser(callback);
		expect(callback).toHaveBeenCalled();
	});

	it('should not execute callback if not running in the browser', () => {
		mockClientInfo = new MockClientInfo(false, '1.0.0');
		clientCallbackService = new ClientCallbackService(mockClientInfo);
		const callback = jest.fn();
		clientCallbackService.executeIfBrowser(callback);
		expect(callback).not.toHaveBeenCalled();
	});

	it('should execute callback if running in SSR', () => {
		mockClientInfo = new MockClientInfo(false, '1.0.0');
		clientCallbackService = new ClientCallbackService(mockClientInfo);
		const callback = jest.fn();
		clientCallbackService.executeIfSSR(callback);
		expect(callback).toHaveBeenCalled();
	});

	it('should not execute callback if not running in SSR', () => {
		const callback = jest.fn();
		clientCallbackService.executeIfSSR(callback);
		expect(callback).not.toHaveBeenCalled();
	});
});