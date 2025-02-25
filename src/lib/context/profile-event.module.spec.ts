import { TestBed } from '@angular/core/testing';
import { ProfileEventModule } from './profile-event.module';
import { ProfileEventReader } from './profile-event-reader';
import { ProfileEventBusService } from './profile-bus.service';
import { ProfileEventEmitter } from './profile-event-emitter';

describe('ProfileEventModule', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ProfileEventModule]
		});
	});

	it('should provide ProfileEventReader', () => {
		const service = TestBed.inject(ProfileEventReader);
		expect(service).toBeTruthy();
	});

	it('should provide ProfileEventBusService', () => {
		const service = TestBed.inject(ProfileEventBusService);
		expect(service).toBeTruthy();
	});

	it('should provide ProfileEventEmitter', () => {
		const service = TestBed.inject(ProfileEventEmitter);
		expect(service).toBeTruthy();
	});

	it('should provide the same instance of ProfileEventBusService', () => {
		const service1 = TestBed.inject(ProfileEventBusService);
		const service2 = TestBed.inject(ProfileEventBusService);
		expect(service1).toBe(service2);
	});
});
