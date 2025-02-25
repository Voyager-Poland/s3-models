import { TestBed } from '@angular/core/testing';
import { ClientModule } from './client.module';
import { ClientCallbackService } from './client-callback.service';
import { ClientInfoService } from './client-info.service';

describe('ClientModule', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ClientModule]
		});
	});

	it('should provide ClientCallbackService', () => {
		const clientCallback = TestBed.inject(ClientCallbackService);
		expect(clientCallback).toBeTruthy();
	});

	it('should provide CLIENT_INFO_TOKEN mapped to ClientInfoService', () => {
		const clientInfo = TestBed.inject(ClientInfoService);
		expect(clientInfo).toBeTruthy();
		expect(clientInfo instanceof ClientInfoService).toBe(true);
	});
});