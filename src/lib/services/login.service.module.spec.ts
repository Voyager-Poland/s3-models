import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { ProfileStoreModule } from '../stores/profile-store.module';
import { ProfileEventModule } from '../context/profile-event.module';
import { LoginServiceModule } from './login.service.module';

describe('LoginServiceModule', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ProfileEventModule, ProfileStoreModule.forRoot("dd", {}, 200), LoginServiceModule],
		});
	});

	it('should provide LoginService', () => {
		const service = TestBed.inject(LoginService);
		expect(service).toBeTruthy();
	});
});
