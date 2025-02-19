///npx jest --testPathPattern=src/services/common/client-info.service.spec.ts

import { ClientInfoService } from './client-info.service';

describe('ClientInfoService', () => {
	let service: ClientInfoService;

	beforeEach(() => {
		service = new ClientInfoService('browser');
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return true for isBrowser when platform is browser', () => {
		expect(service.isBrowser()).toBe(true);
	});

	it('should return false for isSSR when platform is browser', () => {
		expect(service.isSSR()).toBe(false);
	});

	it('should return false for isBrowser when platform is server', () => {
		service = new ClientInfoService('server');
		expect(service.isBrowser()).toBe(false);
	});

	it('should return true for isSSR when platform is server', () => {
		service = new ClientInfoService('server');
		expect(service.isSSR()).toBe(true);
	});
});