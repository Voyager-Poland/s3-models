import { TestBed } from '@angular/core/testing';
import { LoginServiceModule } from './login.service.module';
import { LoginService } from './login.service';

describe('LoginServiceModule', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LoginServiceModule]
		});
	});

	it('should provide LoginService', () => {
		const service = TestBed.inject(LoginService);
		expect(service).toBeTruthy();
	});
});
